describe('Example', function(){
  describe('#First step in example', function(){
    it('should be a string', function(done){
      "example".should.be.instanceOf(String).and.have.length(7);
      done();
    });
    it('Backbone should exist and be an object', function(done){
      Backbone.should.be.instanceOf(Object);
      done();
    });
    it('Underscore should exist and should be a function', function(done){
      _.should.be.type('function');
      done();
    });
    it('G should exist and should be an object', function(done){
      G.should.be.instanceOf(Object);
      done();
    });
    it('Zepto should exist and be should an object', function(done){
      $.should.be.instanceOf(Object);
      done();
    });
  });
});