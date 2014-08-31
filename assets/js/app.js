
var app = {

    views       : {},
    models      : {},
    collections : {},
    routers     : {},
    utils       : {}

};

$(function(){

  console.log('=========== APP ===========');
  console.log('===========================');
  console.log('APP:', app);
  console.log('===========================');
  console.log('========= LOADED ==========');

  var templates = [];

  app.utils.templates.load(templates, function viewsLoaded(results){

    _.each(results, function(result){
      if(result[0]) console.error('Error loading', result[0], 'template.');
    });

  });

});
