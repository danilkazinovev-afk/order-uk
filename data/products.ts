export interface Product {
  article: string
  barcode: string
  sku: string
  weightPcs: number
  pricePerPack: number
  packsInBox: number
  boxesOnPallet: number
  weightBoxGross: number
}

export interface Category {
  id: string
  name: string
  color: string
  products: Product[]
}

export const categories: Category[] = [
  {
    id: 'tea-family',
    name: 'Tea Family',
    color: 'bg-blue-700',
    products: [
      { article: '13405102', barcode: '4823118605488', sku: "Tea ТМ Tea Family 'Green Tea' green loose leaf", weightPcs: 80, pricePerPack: 0.59, packsInBox: 24, boxesOnPallet: 72, weightBoxGross: 2.7 },
      { article: '13404102', barcode: '4823118605471', sku: "Tea Family 'Black Tea' black loose leaf", weightPcs: 80, pricePerPack: 0.59, packsInBox: 24, boxesOnPallet: 72, weightBoxGross: 2.7 },
      { article: '13401216', barcode: '4823118602180', sku: 'Tea ТМ Tea Family «Black tea» 150 g. (100 tea bags.*1,5 g.)', weightPcs: 150, pricePerPack: 1.37, packsInBox: 10, boxesOnPallet: 72, weightBoxGross: 2.6 },
      { article: '13401211', barcode: '4823118605860', sku: 'Tea Family Black tea 37,5 g. (25 tea bags.*1,5g.)', weightPcs: 37.5, pricePerPack: 0.37, packsInBox: 18, boxesOnPallet: 210, weightBoxGross: 1.2 },
      { article: '13400211', barcode: '4823118605891', sku: 'Tea Family «Bergamot» 37,5 g. (25 tea bags.*1,5g.)', weightPcs: 37.5, pricePerPack: 0.37, packsInBox: 18, boxesOnPallet: 210, weightBoxGross: 1.2 },
      { article: '13402210', barcode: '4823118602227', sku: 'Tea Family Lemon 30 g. (20 pot*1,5g.)', weightPcs: 30, pricePerPack: 0.32, packsInBox: 24, boxesOnPallet: 132, weightBoxGross: 1.2 },
      { article: '13403210', barcode: '4823118602241', sku: 'Tea Family «Raspberry» 30 g. (20 pot*1,5g.)', weightPcs: 30, pricePerPack: 0.32, packsInBox: 24, boxesOnPallet: 132, weightBoxGross: 1.2 },
      { article: '13406248', barcode: '4823118605525', sku: 'Tea Family Camomile 30 g. (20 pot*1,5g.)', weightPcs: 20, pricePerPack: 0.32, packsInBox: 24, boxesOnPallet: 117, weightBoxGross: 1.1 },
      { article: '13407248', barcode: '4823118605549', sku: 'Tea Family Mint 30 g. (20 pot*1,5g.)', weightPcs: 20, pricePerPack: 0.32, packsInBox: 24, boxesOnPallet: 117, weightBoxGross: 1.1 },
      { article: '13409179', barcode: '4823118607338', sku: 'Tea Family «Karkade» 70 g', weightPcs: 70, pricePerPack: 0.46, packsInBox: 40, boxesOnPallet: 30, weightBoxGross: 3.3 },
    ],
  },
  {
    id: 'sherlock-leaf',
    name: 'Sherlock Secrets leaf',
    color: 'bg-orange-700',
    products: [
      { article: '12300106', barcode: '4823118600711', sku: 'Sherlock Secrets Pure Ceylon 100 g.', weightPcs: 100, pricePerPack: 0.90, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12301106', barcode: '4823118600902', sku: 'Sherlock Secrets English Breakfast 100 g.', weightPcs: 100, pricePerPack: 0.90, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12302106', barcode: '4823118600995', sku: 'Sherlock Secrets Earl Grey 100 g.', weightPcs: 100, pricePerPack: 0.90, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12306106', barcode: '4823118600735', sku: 'Sherlock Secrets Rich Assam 100 g.', weightPcs: 100, pricePerPack: 0.90, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12326106', barcode: '4823118602364', sku: 'Sherlock Secrets Pure Green 100 g', weightPcs: 100, pricePerPack: 0.90, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12331106', barcode: '4823118603484', sku: 'Sherlock Secrets Milk Oolong 100 g', weightPcs: 100, pricePerPack: 0.90, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12348106', barcode: '4823118603460', sku: 'Sherlock Secrets Jasmine Tea 100g', weightPcs: 100, pricePerPack: 0.90, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
    ],
  },
  {
    id: 'sherlock-teabags',
    name: 'Sherlock Secrets tea bags',
    color: 'bg-orange-700',
    products: [
      { article: '12300211', barcode: '4823118601190', sku: 'Sherlock Secrets Pure Ceylon 50 g (25 tea-bags*2 g).', weightPcs: 50, pricePerPack: 0.55, packsInBox: 18, boxesOnPallet: 210, weightBoxGross: 1.40 },
      { article: '12306211', barcode: '4823118601176', sku: 'Sherlock Secrets Rich Assam 50 g (25 tea-bags*2 g).', weightPcs: 50, pricePerPack: 0.55, packsInBox: 18, boxesOnPallet: 210, weightBoxGross: 1.40 },
      { article: '12301211', barcode: '4823118601213', sku: 'Sherlock Secrets English Breakfast 50 g (25 tea-bags*2 g).', weightPcs: 50, pricePerPack: 0.55, packsInBox: 18, boxesOnPallet: 210, weightBoxGross: 1.40 },
      { article: '12302211', barcode: '4823118600797', sku: 'Sherlock Secrets Earl Grey 50 g (25 tea-bags*2 g).', weightPcs: 50, pricePerPack: 0.55, packsInBox: 18, boxesOnPallet: 210, weightBoxGross: 1.40 },
      { article: '12326211', barcode: '4823118602340', sku: 'Sherlock Secrets Pure Green 45 g (25 tea-bags*1,8 g).', weightPcs: 45, pricePerPack: 0.55, packsInBox: 18, boxesOnPallet: 210, weightBoxGross: 1.30 },
      { article: '12302216', barcode: '4823118606379', sku: 'Sherlock Secrets Earl Grey 200 g (100 tea-bags*2 g).', weightPcs: 200, pricePerPack: 1.65, packsInBox: 10, boxesOnPallet: 72, weightBoxGross: 2.99 },
      { article: '12301216', barcode: '4823118606386', sku: 'Sherlock Secrets English Breakfast 200 g (100 tea-bags*2 g).', weightPcs: 200, pricePerPack: 1.65, packsInBox: 10, boxesOnPallet: 72, weightBoxGross: 2.99 },
    ],
  },
  {
    id: 'sherlock-sachets',
    name: 'Sherlock Secrets sachets',
    color: 'bg-orange-700',
    products: [
      { article: '12350217', barcode: '4823118604214', sku: 'Sherlock Secrets Alpine Meadow 33 g (22 sachets * 1,5)', weightPcs: 33, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.03 },
      { article: '12356217', barcode: '4823118604184', sku: 'Sherlock Secrets Pleasure Time 39,6 g (22 sachets * 1,8)', weightPcs: 39.6, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '12354217', barcode: '4823118604153', sku: 'Sherlock Secrets Green Melissa 39,6 g (22 sachets * 1,8)', weightPcs: 39.6, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '12357217', barcode: '4823118604337', sku: 'Sherlock Secrets Spring Feeling 39,6 g (22 sachets * 1,8)', weightPcs: 39.6, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '12353217', barcode: '4823118604122', sku: 'Sherlock Secrets Dragon of China 39,6 g (22 sachets * 1,8)', weightPcs: 39.6, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '12355217', barcode: '4823118604306', sku: 'Sherlock Secrets Mystery of Kenya 44 g (22 sachets * 2)', weightPcs: 44, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
      { article: '12352217', barcode: '4823118604245', sku: 'Sherlock Secrets Crown of England 44 g (22 sachets * 2)', weightPcs: 44, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
      { article: '12351217', barcode: '4823118604368', sku: 'Sherlock Secrets Bergamot Prime 44 g (22 sachets * 2)', weightPcs: 44, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
      { article: '12358217', barcode: '4823118604276', sku: 'Sherlock Secrets The Finest Ceylon 44 g (22 sachets * 2)', weightPcs: 44, pricePerPack: 0.72, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
    ],
  },
  {
    id: 'tm-sachets',
    name: 'Tea Moments sachets',
    color: 'bg-green-700',
    products: [
      { article: '11206217', barcode: '4823118606638', sku: 'Tea Moments Bergamot Bouquet 39,6 g (22 sachets*1,8 g) new', weightPcs: 39.6, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '11204217', barcode: '4823118606850', sku: 'Tea Moments Summer Melody 35,2 g (22 sachets*1,6 g) new', weightPcs: 35.2, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.05 },
      { article: '11202217', barcode: '4823118606805', sku: 'Tea Moments Mango Time 35,2 g (22 sachets*1,6 g) new', weightPcs: 35.2, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.05 },
      { article: '11792217', barcode: '4823118606775', sku: 'Tea Moments Sunny Smile 39,6 g (22 sachets*1,8 g) new', weightPcs: 39.6, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '11203217', barcode: '4823118606867', sku: 'Tea Moments Mojito Breeze 35,2 g (22 sachets*1,6 g) new', weightPcs: 35.2, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.05 },
      { article: '11767217', barcode: '4823118606706', sku: 'Tea Moments Rooibos Dream 33 g (22 sachets*1,5 g) new', weightPcs: 33, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.05 },
      { article: '11790217', barcode: '4823118606676', sku: 'Tea Moments Ruby Night 37,4 g (22 sachets*1,7 g) new', weightPcs: 37.4, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.08 },
      { article: '11791217', barcode: '4823118606768', sku: 'Tea Moments Fruity Berries 39,6 g (22 sachets*1,8 g) new', weightPcs: 39.6, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '11793217', barcode: '4823118606911', sku: 'Tea Moments Spicy Ginger 33 g (22 sachets*1,5 g) new', weightPcs: 33, pricePerPack: 0.66, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.03 },
    ],
  },
  {
    id: 'tm-pyramids',
    name: 'Tea Moments pyramids',
    color: 'bg-green-700',
    products: [
      { article: '11200223', barcode: '4823118600230', sku: 'Tea Moments Berries Party 36 g (20 pyramids*1,8)', weightPcs: 36, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11202223', barcode: '4823118600292', sku: 'Tea Moments Mango Time 34 g (20 pyramids*1,7)', weightPcs: 34, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11203223', barcode: '4823118600339', sku: 'Tea Moments Mojito Breeze 34 g (20 pyramids*1,7)', weightPcs: 34, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11204223', barcode: '4823118600377', sku: 'Tea Moments Summer Melody 34 g (20 pyramids*1,7)', weightPcs: 34, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11219223', barcode: '4823118601527', sku: 'Tea Moments Citrus Love 34 g (20 pyramids*1,7)', weightPcs: 34, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11283223', barcode: '4823118603514', sku: 'Tea Moments Tropical Fruits 34 g (20 pyramids*1,7)', weightPcs: 34, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11234223', barcode: '4823118603576', sku: 'Tea Moments Alpine Meadow 34 g (20 pyramids*1,7)', weightPcs: 34, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11245223', barcode: '4823118602920', sku: 'Tea Moments Sparkling Strawberry 34 g (20 pyramids*1,7)', weightPcs: 34, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11786223', barcode: '4823118606584', sku: 'Tea Moments Lemon Tart 36 g (20 pyramids*1,8) new', weightPcs: 36, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11789223', barcode: '4823118606614', sku: 'Tea Moments Cherry Brownie 36 g (20 pyramids*1,8) new', weightPcs: 36, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
      { article: '11787223', barcode: '4823118606591', sku: 'Tea Moments Pumpkin Cookie 36 g (20 pyramids*1,8) new', weightPcs: 36, pricePerPack: 0.53, packsInBox: 14, boxesOnPallet: 176, weightBoxGross: 0.90 },
    ],
  },
  {
    id: 'tm-caddy',
    name: 'Tea Moments caddy packets in display boxes',
    color: 'bg-sky-700',
    products: [
      { article: '11806224', barcode: '4823118605365', sku: 'Tea Moments Buckwheat Essence caddy packets 36g (15*2,4)', weightPcs: 36, pricePerPack: 1.21, packsInBox: 8, boxesOnPallet: 132, weightBoxGross: 0.9 },
      { article: '11805224', barcode: '4823118604931', sku: 'Tea Moments Alpine Meadow caddy packets 33g (15*2,2)', weightPcs: 33, pricePerPack: 1.21, packsInBox: 8, boxesOnPallet: 132, weightBoxGross: 0.9 },
      { article: '11807224', barcode: '4823118604962', sku: 'Tea Moments Nights of Wonder caddy packets 33g (15*2,2)', weightPcs: 33, pricePerPack: 1.21, packsInBox: 8, boxesOnPallet: 132, weightBoxGross: 0.9 },
      { article: '11810224', barcode: '4823118604894', sku: 'Tea Moments Assorted Green Tea 33,6g (5 tastes x 3 caddy packets)', weightPcs: 33.6, pricePerPack: 1.21, packsInBox: 8, boxesOnPallet: 132, weightBoxGross: 0.9 },
      { article: '11811224', barcode: '4823118604856', sku: 'Tea Moments Assorted Fruit Tea 34,2g (5 tastes x 3 caddy packets)', weightPcs: 34.2, pricePerPack: 1.21, packsInBox: 8, boxesOnPallet: 132, weightBoxGross: 0.9 },
      { article: '11808224', barcode: '4823118605037', sku: 'Tea Moments Assorted Black Tea 33,6g (5 tastes x 3 caddy packets)', weightPcs: 33.6, pricePerPack: 1.21, packsInBox: 8, boxesOnPallet: 132, weightBoxGross: 0.9 },
    ],
  },
  {
    id: 'tm-assorted',
    name: 'Tea Moments Assorted Collection',
    color: 'bg-sky-700',
    products: [
      { article: '11783250', barcode: '4823118606553', sku: 'Tea Moments Magical Moments pyramids assorted 54,4 g (32 pyramids*1,7)', weightPcs: 54.4, pricePerPack: 1.30, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.2 },
      { article: '11752250', barcode: '4823118606492', sku: 'Tea Moments Bright Moments pyramids assorted 54,4 g (32 pyramids*1,7)', weightPcs: 54.4, pricePerPack: 1.30, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.2 },
      { article: '11782250', barcode: '4823118606515', sku: 'Tea Moments Sunny Moments pyramids assorted 54,4 g (32 pyramids*1,7)', weightPcs: 54.4, pricePerPack: 1.30, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.2 },
      { article: '11785201', barcode: '4823118606577', sku: 'Tea Moments Warm Moments sachets assorted 57,6g (32 sachets*1,8)', weightPcs: 57.6, pricePerPack: 1.10, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.5 },
      { article: '11784201', barcode: '4823118606454', sku: 'Tea Moments Relax Moments sachets assorted 57,6g (32 sachets*1,8)', weightPcs: 57.6, pricePerPack: 1.10, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.5 },
    ],
  },
  {
    id: 'tm-tube',
    name: 'Tea Moments Tube Collection',
    color: 'bg-sky-700',
    products: [
      { article: '11768179', barcode: '4823118607062', sku: 'Tea Moments Roseberry Fusion 70g', weightPcs: 70, pricePerPack: 1.50, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11766179', barcode: '4823118607123', sku: 'Tea Moments Energizing Flow 70g', weightPcs: 70, pricePerPack: 1.50, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11767179', barcode: '4823118607130', sku: 'Tea Moments Rooibos Dream 70g', weightPcs: 70, pricePerPack: 1.50, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11298179', barcode: '4823118606942', sku: 'Tea Moments Midnight Peach 70g', weightPcs: 70, pricePerPack: 1.50, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11765179', barcode: '4823118607109', sku: 'Tea Moments Citrus Chill 70g', weightPcs: 70, pricePerPack: 1.50, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11302179', barcode: '4823118607048', sku: 'Tea Moments Buckwheat Essence 70g', weightPcs: 70, pricePerPack: 1.50, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
    ],
  },
]
