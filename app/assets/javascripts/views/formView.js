Pokedex.Views.FormView = Backbone.View.extend({
  template: JST['pokemonForm'],
  initialize: function(options){
    this.$el = options.$el;
    this.model = options.model;
    this.collection = options.collection;
    // this.$el.on("click", "button", this.savePokemon.bind(this));
    // this.listenTo(this.model, "sync", this.render);
    // this.render();
  },

  render: function(){
    var content = this.template({pokemon: this.model});
    this.$el.html(content);
  },

  savePokemon: function (event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();
    this.model.save(attributes, { success: function () {
      this.collection.add(this.model);
      Backbone.history.navigate('pokemon/'+this.model.id, {trigger: true});
      this.render();
      this.model = null;
    }.bind(this)});

  },
  events: {
    "submit form": "savePokemon"
  }
});
