Pokedex.Views.PokemonDetail = Backbone.View.extend({
  template: JST['pokemonDetail'],
  initialize: function(options){
    this.$el = options.$el;
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
    this.render();
  },

  render: function(){
    var content = this.template({pokemon: this.model});
    this.$el.html(content);
    var $ul = this.$el.find('ul.toys');
    this.model.toys().each(function(toy) {
      var content = JST['toyListItem']({toy: toy});
      $ul.append(content);
    });
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data('toy-id');
    var pokemonId = $(event.currentTarget).data('pokemon-id');
    var toy = this.model.toys().get(toyId);
    Backbone.history.navigate("/pokemon/" + pokemonId + "/toys/" + toyId, {trigger: true});
  },

  events: {
    "click li": "selectToyFromList"
  }
});
