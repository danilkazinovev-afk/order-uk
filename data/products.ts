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
    id: 'sherlock-leaf',
    name: 'Sherlock Secrets leaf',
    color: 'bg-orange-700',
    products: [
      { article: '12300106', barcode: '4823118600711', sku: 'Sherlock Secrets Pure Ceylon 100 g.', weightPcs: 100, pricePerPack: 0.89, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12301106', barcode: '4823118600902', sku: 'Sherlock Secrets English Breakfast 100 g.', weightPcs: 100, pricePerPack: 0.89, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12302106', barcode: '4823118600995', sku: 'Sherlock Secrets Earl Grey 100 g.', weightPcs: 100, pricePerPack: 0.89, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12306106', barcode: '4823118600735', sku: 'Sherlock Secrets Rich Assam 100 g.', weightPcs: 100, pricePerPack: 0.89, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12326106', barcode: '4823118602364', sku: 'Sherlock Secrets Pure Green 100 g.', weightPcs: 100, pricePerPack: 0.89, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12331106', barcode: '4823118603484', sku: 'Sherlock Secrets Milk Oolong 100 g.', weightPcs: 100, pricePerPack: 0.89, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
      { article: '12348106', barcode: '4823118603460', sku: 'Sherlock Secrets Jasmine Tea 100 g.', weightPcs: 100, pricePerPack: 0.89, packsInBox: 14, boxesOnPallet: 120, weightBoxGross: 1.9 },
    ],
  },
  {
    id: 'sherlock-teabags',
    name: 'Sherlock Secrets tea bags',
    color: 'bg-orange-700',
    products: [
      { article: '12302216', barcode: '4823118606379', sku: 'Sherlock Secrets Earl Grey 200 g (100 tea-bags*2 g).', weightPcs: 200, pricePerPack: 1.58, packsInBox: 10, boxesOnPallet: 72, weightBoxGross: 2.99 },
      { article: '12301216', barcode: '4823118606386', sku: 'Sherlock Secrets English Breakfast 200 g (100 tea-bags*2 g).', weightPcs: 200, pricePerPack: 1.58, packsInBox: 10, boxesOnPallet: 72, weightBoxGross: 2.99 },
    ],
  },
  {
    id: 'sherlock-sachets',
    name: 'Sherlock Secrets sachets',
    color: 'bg-orange-700',
    products: [
      { article: '12350217', barcode: '4823118604214', sku: 'Sherlock Secrets Alpine Meadow 33 g (22 sachets * 1,5g)', weightPcs: 33, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.03 },
      { article: '12356217', barcode: '4823118604184', sku: 'Sherlock Secrets Pleasure Time 39,6 g (22 sachets * 1,8g)', weightPcs: 39.6, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '12354217', barcode: '4823118604153', sku: 'Sherlock Secrets Green Melissa 39,6 g (22 sachets * 1,8g)', weightPcs: 39.6, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '12357217', barcode: '4823118604337', sku: 'Sherlock Secrets Spring Feeling 39,6 g (22 sachets * 1,8g)', weightPcs: 39.6, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '12353217', barcode: '4823118604122', sku: 'Sherlock Secrets Dragon of China 39,6 g (22 sachets * 1,8g)', weightPcs: 39.6, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '12355217', barcode: '4823118604306', sku: 'Sherlock Secrets Mystery of Kenya 44 g (22 sachets * 2g)', weightPcs: 44, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
      { article: '12352217', barcode: '4823118604245', sku: 'Sherlock Secrets Crown of England 44 g (22 sachets * 2g)', weightPcs: 44, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
      { article: '12351217', barcode: '4823118604368', sku: 'Sherlock Secrets Bergamot Prime 44 g (22 sachets * 2g)', weightPcs: 44, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
      { article: '12358217', barcode: '4823118604276', sku: 'Sherlock Secrets The Finest Ceylon 44 g (22 sachets * 2g)', weightPcs: 44, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
      { article: '12369217', barcode: '4823118608205', sku: 'Sherlock Secrets Berries Charm 35,2 g (22 sachets * 1,6g)', weightPcs: 35.2, pricePerPack: 0.92, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.16 },
    ],
  },
  {
    id: 'tm-sachets',
    name: 'Tea Moments sachets',
    color: 'bg-green-700',
    products: [
      { article: '11206217', barcode: '4823118606638', sku: 'Tea Moments Bergamot Bouquet 39,6 g (22 sachets*1,8 g) new', weightPcs: 39.6, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '11204217', barcode: '4823118606850', sku: 'Tea Moments Summer Melody 35,2 g (22 sachets*1,6 g) new', weightPcs: 35.2, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.05 },
      { article: '11202217', barcode: '4823118606805', sku: 'Tea Moments Mango Time 35,2 g (22 sachets*1,6 g) new', weightPcs: 35.2, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.05 },
      { article: '11792217', barcode: '4823118606775', sku: 'Tea Moments Sunny Smile 39,6 g (22 sachets*1,8 g) new', weightPcs: 39.6, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.10 },
      { article: '11203217', barcode: '4823118606867', sku: 'Tea Moments Mojito Breeze 35,2 g (22 sachets*1,6 g) new', weightPcs: 35.2, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.05 },
      { article: '11767217', barcode: '4823118606706', sku: 'Tea Moments Rooibos Dream 33 g (22 sachets*1,5 g) new', weightPcs: 33, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.03 },
      { article: '11790217', barcode: '4823118606676', sku: 'Tea Moments Ruby Night 37,4 g (22 sachets*1,7 g) new', weightPcs: 37.4, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.03 },
      { article: '11791217', barcode: '4823118606768', sku: 'Tea Moments Fruity Berries 39,6 g (22 sachets*1,8 g) new', weightPcs: 39.6, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.03 },
      { article: '11793217', barcode: '4823118606911', sku: 'Tea Moments Spicy Ginger 33 g (22 sachets*1,5 g) new', weightPcs: 33, pricePerPack: 0.64, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.03 },
    ],
  },
  {
    id: 'tm-caddy',
    name: 'Tea Moments caddy packets in display boxes',
    color: 'bg-sky-700',
    products: [
      { article: '11302224', barcode: '4823118605365', sku: 'Tea Moments Buckwheat Essence caddy packets 36g (15*2,4)', weightPcs: 36, pricePerPack: 1.23, packsInBox: 15, boxesOnPallet: 132, weightBoxGross: 1.5 },
      { article: '11234224', barcode: '4823118604931', sku: 'Tea Moments Alpine Meadow caddy packets 33g (15*2,2)', weightPcs: 33, pricePerPack: 1.23, packsInBox: 15, boxesOnPallet: 132, weightBoxGross: 1.4 },
      { article: '11296224', barcode: '4823118604894', sku: 'Tea Moments Assorted Green Tea 33,6g (5 tastes x 3 caddy packets)', weightPcs: 33.6, pricePerPack: 1.05, packsInBox: 15, boxesOnPallet: 132, weightBoxGross: 1.4 },
      { article: '11297224', barcode: '4823118604856', sku: 'Tea Moments Assorted Fruit Tea 34,2g (5 tastes x 3 caddy packets)', weightPcs: 34.2, pricePerPack: 1.05, packsInBox: 15, boxesOnPallet: 132, weightBoxGross: 1.4 },
      { article: '11295224', barcode: '4823118605037', sku: 'Tea Moments Assorted Black Tea 33,6g (5 tastes x 3 caddy packets)', weightPcs: 33.6, pricePerPack: 1.05, packsInBox: 15, boxesOnPallet: 132, weightBoxGross: 1.4 },
    ],
  },
  {
    id: 'tm-assorted',
    name: 'Tea Moments Assorted Collection',
    color: 'bg-sky-700',
    products: [
      { article: '11783250', barcode: '4823118606553', sku: 'Tea Moments Magical Moments pyramids assorted 54,4 g (32 pyramids*1,7g)', weightPcs: 54.4, pricePerPack: 1.17, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.2 },
      { article: '11752250', barcode: '4823118606492', sku: 'Tea Moments Bright Moments pyramids assorted 54,4 g (32 pyramids*1,7g)', weightPcs: 54.4, pricePerPack: 1.17, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.2 },
      { article: '11782250', barcode: '4823118606515', sku: 'Tea Moments Sunny Moments pyramids assorted 54,4 g (32 pyramids*1,7g)', weightPcs: 54.4, pricePerPack: 1.17, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.2 },
      { article: '11782255', barcode: '4823118608564', sku: 'Tea Moments Colourful Moments sachets assorted 57,6 g (32 sachets*1,8g)', weightPcs: 57.6, pricePerPack: 1.13, packsInBox: 8, boxesOnPallet: 176, weightBoxGross: 1.2 },
    ],
  },
  {
    id: 'tm-tube',
    name: 'Tea Moments Tube Collection',
    color: 'bg-sky-700',
    products: [
      { article: '11768179', barcode: '4823118607062', sku: 'Tea Moments Roseberry Fusion 70g', weightPcs: 70, pricePerPack: 1.38, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11766179', barcode: '4823118607123', sku: 'Tea Moments Energizing Flow 70g', weightPcs: 70, pricePerPack: 1.38, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11767179', barcode: '4823118607130', sku: 'Tea Moments Rooibos Dream 70g', weightPcs: 70, pricePerPack: 1.38, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11298179', barcode: '4823118606942', sku: 'Tea Moments Midnight Peach 70g', weightPcs: 70, pricePerPack: 1.38, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11765179', barcode: '4823118607109', sku: 'Tea Moments Citrus Chill 70g', weightPcs: 70, pricePerPack: 1.38, packsInBox: 10, boxesOnPallet: 132, weightBoxGross: 1.6 },
    ],
  },
  {
    id: 'tm-limited',
    name: 'Tea Moments Limited collection',
    color: 'bg-green-700',
    products: [
      { article: '11293153', barcode: '4823118607049', sku: 'Tea Moments Nights of Wonder 30 g', weightPcs: 30, pricePerPack: 1.79, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11303153', barcode: '4823118607052', sku: 'Tea Moments Strawberry Kiss 30 g', weightPcs: 30, pricePerPack: 1.79, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.6 },
      { article: '11794153', barcode: '4823118607024', sku: 'Tea Moments Winter Story 30 g', weightPcs: 30, pricePerPack: 1.79, packsInBox: 12, boxesOnPallet: 132, weightBoxGross: 1.6 },
    ],
  },
  {
    id: 'ss-limited',
    name: 'Sherlock Secrets Limited collection',
    color: 'bg-orange-700',
    products: [
      { article: '12361102', barcode: '4823118607084', sku: 'Sherlock Secrets Happy Holidays 80 g', weightPcs: 80, pricePerPack: 3.29, packsInBox: 5, boxesOnPallet: 132, weightBoxGross: 2.1 },
      { article: '12362102', barcode: '4823118607161', sku: 'Sherlock Secrets Christmas 80 g', weightPcs: 80, pricePerPack: 3.32, packsInBox: 5, boxesOnPallet: 108, weightBoxGross: 2.1 },
      { article: '12363102', barcode: '4823118607185', sku: 'Sherlock Secrets New Year Clock 80 g', weightPcs: 80, pricePerPack: 3.24, packsInBox: 7, boxesOnPallet: 132, weightBoxGross: 2.3 },
    ],
  },
]
