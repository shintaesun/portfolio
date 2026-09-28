import os
import time
import sys
import threading
import http.server
import socketserver

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Global state to keep track of file modifications
last_modified_time = 0
clients = []
clients_lock = threading.Lock()

def get_max_mtime():
    max_mtime = 0
    for root, dirs, files in os.walk(DIRECTORY):
        # Skip hidden directories like .git
        if '.git' in dirs:
            dirs.remove('.git')
        for file in files:
            filepath = os.path.join(root, file)
            # Skip python server script itself to avoid reload loops
            if file == 'dev_server.py' or file.endswith('.pyc') or file.startswith('.'):
                continue
            try:
                mtime = os.path.getmtime(filepath)
                if mtime > max_mtime:
                    max_mtime = mtime
            except OSError:
                pass
    return max_mtime

def file_watcher():
    global last_modified_time
    last_modified_time = get_max_mtime()
    while True:
        time.sleep(0.5)
        current_max = get_max_mtime()
        if current_max > last_modified_time:
            last_modified_time = current_max
            print(f"[Watcher] File change detected! Triggering reload...")
            notify_clients()

def notify_clients():
    with clients_lock:
        # Send reload event to all active SSE clients
        for client in clients:
            try:
                client.send_reload()
            except Exception:
                pass
        clients.clear()

class LiveReloadHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path == '/live-reload':
            self.handle_sse()
        else:
            super().do_GET()

    def handle_sse(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/event-stream')
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Connection', 'keep-alive')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        class Client:
            def __init__(self, wfile):
                self.wfile = wfile
            def send_reload(self):
                self.wfile.write(b"data: reload\n\n")
                self.wfile.flush()

        client = Client(self.wfile)
        with clients_lock:
            clients.append(client)

        # Keep connection open by writing periodic pings
        try:
            while True:
                self.wfile.write(b": ping\n\n")
                self.wfile.flush()
                time.sleep(10)
        except Exception:
            # Client disconnected
            with clients_lock:
                if client in clients:
                    clients.remove(client)

    def send_head(self):
        # Override to inject livereload script into HTML files
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            # Try to find index.html
            for index in "index.html", "index.htm":
                index_path = os.path.join(path, index)
                if os.path.exists(index_path):
                    path = index_path
                    break
        
        # Check if the file is HTML
        if path.endswith('.html') or path.endswith('.htm'):
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Inject live reload script before </body>
                script = """
                <!-- Live Reload Script -->
                <script>
                (function() {
                    const eventSource = new EventSource('/live-reload');
                    eventSource.onmessage = function(event) {
                        if (event.data === 'reload') {
                            console.log('File change detected, reloading page...');
                            setTimeout(() => {
                                window.location.reload();
                            }, 100);
                        }
                    };
                    eventSource.onerror = function() {
                        console.log('Live reload connection lost/reconnecting...');
                    };
                })();
                </script>
                """
                if '</body>' in content:
                    content = content.replace('</body>', script + '</body>')
                else:
                    content += script

                encoded = content.encode('utf-8')
                
                # Send custom headers and response
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(encoded)))
                self.end_headers()
                
                # Write the response directly
                self.wfile.write(encoded)
                return None
            except Exception as e:
                self.send_error(500, str(e))
                return None
        
        return super().send_head()

class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True

def start_server():
    ThreadingHTTPServer.allow_reuse_address = True
    with ThreadingHTTPServer(("127.0.0.1", PORT), LiveReloadHandler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            sys.exit(0)

if __name__ == "__main__":
    # Start file watcher in a background thread
    watcher_thread = threading.Thread(target=file_watcher, daemon=True)
    watcher_thread.start()
    
    # Start the server
    start_server()
