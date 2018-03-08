Popuplive
<pre>
Minimal server that publishes posted files


Possible apache reverse proxy conf:

ProxyPass /foo http://127.0.0.1:9999
ProxyPassReverse /foo http://127.0.0.1:9999

<Location /foo/fileupload>
  AuthType Basic
  AuthName "Auth required"
  AuthUserFile /var/www/popuplive/passwd
  require valid-user
</Location>

</pre>
