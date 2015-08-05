Pokedex.Views.PokemonIndex = Backbone.View.extend({
  template: JST['pokemonListItem'],

  initialize: function(options){
    this.collection = new Pokedex.Collections.Pokemon();
    this.$el = options.$el;

    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, 'add', this.addPokemonToList);
  },

  render: function () {
    this.$el.empty();
    var self = this;

    this.collection.each(function(pokemon){
      self.addPokemonToList(pokemon);
    });
  },

  addPokemonToList: function (pokemon) {
    var $li = this.template({pokemon: pokemon});
    this.$el.append($li);
  },

  refreshPokemon: function (callback) {
    this.collection.fetch({success: callback});
  },

  selectPokemonFromList: function (event) {
    var id = $(event.currentTarget).data('id');
    var poke = this.collection.get(id);
    poke.fetch();

    Backbone.history.navigate("pokemon/"+id, {trigger: true});
  },

  events: {
    "click li": "selectPokemonFromList"
  }
});
