Pokedex.Views.Pokemon = Backbone.View.extend({
  initialize: function () {
    this.$pokeList = this.$el.find('.pokemon-list');
    this.$pokeDetail = this.$el.find('.pokemon-detail');
    this.$newPoke = this.$el.find('.pokemon-form');
    this.$toyDetail = this.$el.find('.toy-detail');

    this.pokes = new Pokedex.Collections.Pokemon();

    this.$pokeList.on(
      'click',
      'li.poke-list-item',
      this.selectPokemonFromList.bind(this)
    );
    this.$newPoke.on(
      'submit',
      'form',
      this.submitPokemonForm.bind(this)
    );
    this.$pokeDetail.on(
      'click',
      'li.toy-list-item',
      this.selectToyFromList.bind(this)
    );
  },

  // addPokemonToList: function (pokemon) {
  //   var $li = JST['pokemonListItem']({pokemon: pokemon});
  //   this.$pokeList.append($li);
  // },

  // refreshPokemon: function () {
  //   var that = this;
  //
  //   this.pokes.fetch({ success: function () {
  //     that.pokes.each(function (poke) {
  //       that.addPokemonToList(poke);
  //     });
  //   }});
  //
  //   this.$newPoke.html(JST['pokemonForm']());
  // },

  // renderPokemonDetail: function (pokemon) {
  //   var that = this;
  //
  //   var content = JST['pokemonDetail']({pokemon: pokemon});
  //
  //   this.$toyDetail.html('');
  //   this.$pokeDetail.html(content);
  //
  //   pokemon.fetch({ success: function () {
  //     pokemon.toys().forEach(function (toy) {
  //       that.addToyToList(toy);
  //     });
  //   }});
  // },

  // selectPokemonFromList: function (event) {
  //   var id = $(event.currentTarget).data('id');
  //   var poke = this.pokes.get(id);
  //   this.renderPokemonDetail(poke);
  // },

  createPokemon: function (attributes, callback) {
    var pokemon = new Pokedex.Models.Pokemon(attributes);
    pokemon.save({}, { success: function () {
      this.pokes.add(pokemon);
      this.addPokemonToList(pokemon);
      callback && callback(pokemon);
    }.bind(this)});
  },

  submitPokemonForm: function (event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();
    this.createPokemon(attributes, this.renderPokemonDetail.bind(this));
  },

  // addToyToList: function (toy) {
  //   var $li = JST['toyListItem']({toy: toy});
  //   this.$pokeDetail.find($('ul.toys')).append($li);
  // },

  // renderToyDetail: function (toy) {
  //   var $detail = JST['toyDetail']({toy: toy, pokes: this.pokes});
  //
  //   this.$toyDetail.html($detail);
  // },

  // selectToyFromList: function (event) {
  //   var toyId = $(event.currentTarget).data('toy-id');
  //   var pokemonId = $(event.currentTarget).data('pokemon-id');
  //   var toy = this.pokes.get(pokemonId).toys().get(toyId);
  //
  //   this.renderToyDetail(toy);
  // }
});
