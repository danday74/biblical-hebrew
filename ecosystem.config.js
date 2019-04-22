// pm2 start
// pm2 logs
// pm2 delete all
// https://pm2.io/doc/en/runtime/guide/ecosystem-file
// https://pm2.io/doc/en/runtime/reference/ecosystem-file

module.exports = {
  apps: [
    {
      name: 'fe',
      script: 'node_modules/@angular/cli/bin/ng',
      args: 'serve -o',
      cwd: 'biblical-hebrew-fe',
      max_restarts: 5,
      min_uptime: 3000,
      exec_mode: 'fork',
      instances: 1, // default
      autorestart: true, // default
      watch: false, // default
      ignore_watch: [],
      max_memory_restart: '1G', // default
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'auth',
      script: 'server.js',
      args: '',
      cwd: 'biblical-hebrew-auth',
      max_restarts: 5,
      min_uptime: 3000,
      exec_mode: 'fork',
      // instances: 1, // commenting this out may help stop Windows spawn
      autorestart: true, // default
      watch: true,
      ignore_watch: ['node_modules'],
      max_memory_restart: '1G', // default
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'be',
      script: 'server.js',
      args: '',
      cwd: 'biblical-hebrew-be',
      max_restarts: 5,
      min_uptime: 3000,
      exec_mode: 'fork',
      // instances: 1, // commenting this out may help stop Windows spawn
      autorestart: true, // default
      watch: true,
      ignore_watch: ['node_modules', 'db/db.json'],
      max_memory_restart: '1G', // default
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
