Pokedex.Routers.Router = Backbone.Router.extend({
  initialize: function(){
    // this._pokemonIndex = null;
    // this._pokemonDetail = null;
  },

  routes: {
    '' : 'index',
    'pokemon/:id' : 'show',
    'pokemon/:pokemonId/toys/:toyId': 'toyDetail'
  },
  index: function(callback){
    this._pokemonIndex = new Pokedex.Views.PokemonIndex({$el: $("#pokedex .pokemon-list")});
    this._pokemonIndex.refreshPokemon(callback);
    this.pokemonForm();
  },

  show: function(id, callback){
    if (!this._pokemonIndex) {
      this.index(this.show.bind(this, id, callback));
      return;
    }
    $('#pokedex .toy-detail').empty();
    var poke = this._pokemonIndex.collection.get(id);
    poke.fetch({success: callback});
    this._pokemonDetail = new Pokedex.Views.PokemonDetail({model: poke, $el: $('#pokedex .pokemon-detail')});
  },

  toyDetail: function (pokemonId, toyId) {
    if (!this._pokemonDetail) {
      this.show(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
      return;
    }
    var toy = this._pokemonDetail.model.toys().get(toyId);
    var view = new Pokedex.Views.ToyDetail({model: toy, $el: $('#pokedex .toy-detail')});
    view.render();
  },

  pokemonForm: function () {
    var pokemon = new Pokedex.Models.Pokemon();
    var view = new Pokedex.Views.FormView({model: pokemon, collection: this._pokemonIndex.collection, $el: $('#pokedex .pokemon-form')});
    view.render();
  }
});
