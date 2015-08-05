Pokedex.Views.ToyDetail = Backbone.View.extend({
  template: JST['toyDetail'],
  initialize: function(options){
    this.$el = options.$el;
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    var content = this.template({toy: this.model, pokes: _([])});
    this.$el.html(content);
  }
});
