module.exports = {
  apps : [{
    script: ' node ./bin/www',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'sadeeq',
      host : '138.68.118.50',
      repo : 'https://github.com/tosin199/Blog-Project.git',
      path : 'origin/Dev',
      'pre-deploy-local': '',
      "post-deploy" : "pm2 startOrRestart ecosystem.config.js --env production"
    },
  }
}
