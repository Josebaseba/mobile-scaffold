app.utils.templates = (function(){

  var addTemplates = function(view){

    var promise = new G.Promise();

    G.ajax('GET', 'templates/' + view + '.html').then(function saveTemplate(err, data){
      if(err) return promise.done(view);
      app.views[view].prototype.template = _.template(data);
      return promise.done(null, view);
    });

    return promise;

  };

  var load = function(views, done) {

    var templates = [];

    _.each(views, function(view){
      if(app.views[view]){
        templates.push(addTemplates(view));
      }
    });

    G.parallel(templates).then(done);

  };

  return {
    load: load
  };

})();
