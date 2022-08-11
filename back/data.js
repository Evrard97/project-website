import Randomstring from "randomstring";
import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      pseudo: "User",
      fullname: "test test",
      email: "test@gmail.com",
      password: bcrypt.hashSync("test"),
      isAdmin: false,
    },
    {
      pseudo: "Admin",
      fullname: "Admin Admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("admin"),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: "Lenovo ThinkBook 15 G2 ITL (20VE009BFR)",
      price: 849.99,
      stock: 10,
      category: "Ordinateurs",
      mark: "Lenovo",
      image: "/images/image1.jpg",
      rating: 3.6,
      description: "PC Portable 15.6\" Full HD (1920 x 1080) - Intel Core i5-1135G7 Quad-Core 2.4 GHz - 8 Go DDR4 - SSD 256 Go - 1.7 Kg - Windows 11 Pro",
      reviews: 3,
      reference: Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      })
    },
    {
      name: "Dell G15 (5510-936)",
      price: 929.99,
      stock: 10,
      category: "Ordinateurs",
      mark: "Dell",
      image: "/images/image2.jpg",
      rating: 0,
      description: "PC Portable Gamer 15.6\" Full HD (1920 x 1080) 120 Hz - Intel Core i5-10500H Hexa-Core 2.5 GHz - 8 Go DDR4 - SSD 512 Go - Nvidia GeForce GTX 1650 - 2.4 Kg - Windows 11",
      reviews: 0,
      reference: Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      })
    },
    {
      name: "TV OLED Sony XR-77A83K 77\" Bravia 4K UHD Smart TV Noir 2022",
      price: 3999,
      stock: 10,
      category: "Television",
      mark: "Sony",
      image: "/images/image3.jpg",
      rating: 0,
      description: "Luminosité et contraste OLED uniques avec un son immersifAvec des couleurs exceptionnelles, des noirs purs pour une profondeur et des textures réalistes quel que soit l’angle de vision. La qualité OLED Sony sur le XR-A83K est tout simplement époustouflante. Chaque détail est important sur ce TV 4K. C'est pourquoi les contenus 2K et HD sont automatiquement améliorés dans une qualité proche du 4K avec notre technologie d’amélioration 4K. Les couleurs sont vraiment spectaculaires, grâce à notre gamme de couleurs la plus large.",
      reviews: 0,
      reference: Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      })
    },
    {
      name: "TV Samsung Neo QLED 55\" QE55QN90A 4K UHD Noir",
      price: 999,
      stock: 10,
      category: "Televisions",
      mark: "Samsung",
      image: "/images/image4.jpg",
      rating: 4.7,
      description: "Neo QLED. L'excellence sans compromis. Conçue pour tous et pour durer, la nouvelle gamme Neo QLED vous accompagnera au quotidien dans une véritable démarche eco responsable.LuminositéL'introduction des Quantums Mini LED assure aux téléviseurs Neo QLED une image parfaitement contrastée, idéale pour le contenu HDRQuantum Mini LEDDes dizaines de milliers de Quantum Mini LED répartis sur la dalle pour garantir une image précise et lumineuse avec des contrastes profondsQuantum HDR 2000Quelle que soit la lumière ambiante.",
      reviews: 2,
      reference: Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      })
    },
    {
      name: "T-shirt col V coton stretch",
      price: 12.99,
      stock: 10,
      category: "Vetements",
      mark: "Celio",
      image: "/images/image5.jpg",
      rating: 3.9,
      description: "Ce t-shirt à manches courtes va vous séduire par la grande douceur et le confort du coton. Sa maille coton stretch séduit pour ses propriétés extensibles. Le coloris uni et le col V de ce t-shirt s'accordent aussi bien à un jean qu'à un chino.",
      reviews: 80,
      reference: Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      })
    },
    {
      name: "Polo piqué 100% coton",
      price: 15.99,
      stock: 10,
      category: "Vetements",
      mark: "Celio",
      image: "/images/image6.jpg",
      rating: 4.5,
      description: "Vous porterez ce polo homme à manches courtes avec un pantalon chino, pour créer un look casual et confortable. Le polo est 100 % coton, avec une broderie étoile en ton sur ton au niveau de la poitrine. Son col est agrémenté de deux boutons.",
      reviews: 4,
      reference: Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      })
    },
    {
      name: "Splatoon 3 SWITCH",
      price: 59.99,
      stock: 10,
      category: "Jeux",
      mark: "Nintendo",
      image: "/images/image7.jpg",
      rating: 5,
      description: "La Contrée Clabousse va faire couler beaucoup d'encre dans le nouveau jeu Splatoon ! Découvrez la Contrée Clabousse, un désert aride habité par les Inklings et les Octalings, des créatures rompues au combat. Au cœur de ces terres désolées et poussiéreuses, se trouve Cité-Clabousse, la ville du chaos.",
      reviews: 2,
      reference: Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      })
    },
    {
      name: "Stray PS5",
      price: 39.99,
      stock: 10,
      category: "Jeux",
      mark: "BlueTwelve Studio",
      image: "/images/image8.jpg",
      rating: 0,
      description: "Perdu, seul et séparé de sa famille, un chat errant doit résoudre un ancien mystère pour fuir une ville tombée dans l’oubli.",
      reviews: 0,
      reference: Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      })
    },
  ],
};

export default data;
