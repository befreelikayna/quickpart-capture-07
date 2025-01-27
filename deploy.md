# Deployment Instructions for cPanel

1. Build the project locally:
```bash
npm run build
```

2. Upload files to cPanel:
   - Log in to your cPanel account
   - Navigate to File Manager
   - Create a new directory for your application (e.g., `biostone`)
   - Upload the contents of the `dist` folder to this directory
   - Upload the `.htaccess` file to the same directory

3. Configure domain/subdomain:
   - In cPanel, go to "Domains" or "Subdomains"
   - Point your domain/subdomain to the directory where you uploaded the files

4. Database setup:
   - Create a new MySQL database in cPanel if needed
   - Update the database credentials in your environment variables
   - Import your database schema and data

5. Environment Variables:
   - Make sure to set up your environment variables in the production environment
   - You can create a `.env` file in your cPanel directory with the production values

6. SSL Certificate:
   - If you need HTTPS, install an SSL certificate through cPanel
   - You can use Let's Encrypt for free SSL certificates

Note: Make sure all file permissions are set correctly:
- Folders: 755
- Files: 644
- .htaccess: 644

Common issues:
1. If you see a blank page, check if the .htaccess file is properly uploaded
2. If assets aren't loading, verify the base URL in vite.config.ts
3. For API issues, check the CORS settings and environment variables