import { EONETCategories } from '../types/events';

export const categoriesPT: { [key in EONETCategories]: string } = {
  [EONETCategories.drought]: 'Seca',
  [EONETCategories.dustHaze]: 'Poeira e Névoa',
  [EONETCategories.earthquakes]: 'Terremotos',
  [EONETCategories.floods]: 'Inundações',
  [EONETCategories.landslides]: 'Deslizamentos de Terra',
  [EONETCategories.manmade]: 'Causados pelo Homem',
  [EONETCategories.seaLakeIce]: 'Gelo em Mares e Lagos',
  [EONETCategories.severeStorms]: 'Tempestades Severas',
  [EONETCategories.snow]: 'Neve',
  [EONETCategories.tempExtremes]: 'Extremos de Temperatura',
  [EONETCategories.volcanoes]: 'Vulcões',
  [EONETCategories.waterColor]: 'Cor da Água',
  [EONETCategories.wildfires]: 'Incêndios Florestais',
};

export const translate = { categoriesPT };
