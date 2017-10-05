var Pastry = {
  init: function(type, flavor, levels, price, occasion){
    this.type = type;
    this.flavor = flavor;
    this.levels = levels;
    this.price = price;
    this.occasion = occasion;
  },
  // Dexibe the Pastry
  describe: function(){
    var description = "The " + this.type + " is a " + this.occasion + " pastry, has a " + this.flavor + " flavor, " + this.levels + " layer(s), and costs " + this.price + ".";
    return description;
  },

  bake: function(){
    var baked = "The " + this.flavor + this.type + " was paced in the oven. It's done.";
    return baked;
  }
};

var muffin = Object.create(Pastry);
muffin.init('muffin', 'blueberry', 1, '$2', 'breakfast');
// muffin.type = "muffin";
// muffin.flavor = "blueberry";
// muffin.levels = 1;
// muffin.price = "$2";
// muffin.occasion = "breakfast";

var cake = Object.create(Pastry);
cake.init('cake', 'vanilla', 3, '$10', 'birthday')
// cake.type = "cake";
// cake.flavor = "vanilla";
// cake.levels = 3;
// cake.price = "$10";
// cake.occasion = "birthday";

console.log(muffin.bake());
console.log(cake.bake());
console.log(muffin.describe());
console.log(cake.describe());
