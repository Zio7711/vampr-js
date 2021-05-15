class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let result = 0;
    let vampire = this;

    while (vampire.creator) {
      result++;
      vampire = vampire.creator;
    }
    return result;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    );
  }
  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name) {
      return this;
    }
    for (const kid of this.offspring) {
      const output = kid.vampireWithName(name);
      if (output) {
        return output;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let num = 0;
    for (const kid of this.offspring) {
      num ++;
      num += kid.totalDescendents;
    }
    return num;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let result = [];
    if (this.yearConverted > 1980) {
      result.push(this);
    }
    for (const kid of this.offspring) {
      const kidResult = kid.allMillennialVampires;
      result = result.concat(kidResult)
    }
    return result;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let myAncestors = [this];
    let ancestors = [vampire];
    let me = this;

    while (me.creator) {
      myAncestors.push(me.creator);
      me = me.creator;
    }

    while (vampire.creator) {
      ancestors.push(vampire.creator);
      vampire = vampire.creator;
    }
    

    for (const myAncestor of myAncestors) {
      for (const ancestor of ancestors) {
        if (ancestor.name === myAncestor.name) {
          return ancestor;
        }
      }
    }
  }
}

module.exports = Vampire;

/* rootVampire = new Vampire('root');
let offspring1,
  offspring2,
  offspring3,
  offspring4,
  offspring5,
  offspring6,
  offspring7,
  offspring8;
offspring1 = new Vampire('a',1981);
offspring2 = new Vampire('b',1981);
offspring3 = new Vampire('c',1981);
offspring4 = new Vampire('d',1981);
offspring5 = new Vampire('e',1981);
offspring6 = new Vampire('f',1981);
offspring7 = new Vampire('g',1000);
offspring8 = new Vampire('h',1000);
rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

console.log(offspring5.allMillennialVampires); */
