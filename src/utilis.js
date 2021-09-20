import fs from 'fs-extra';

import { join } from 'path';

const { readJSON, writeJSON, writeFile } = fs;

const publicFolderPathForImage = join(process.cwd(), 'public/products/images');
export const productsJsonPath = join(
	process.cwd(),
	'src/resources/products/products.json',
);
export const reviewsJsonPath = join(
	process.cwd(),
	'src/resources/reviews/reviews.json',
);

export const saveImages = (name, conntentAsBuffer) =>
	writeFile(join(publicFolderPathForImage, name), conntentAsBuffer);
console.log(productsJsonPath);
console.log(reviewsJsonPath);
export const readProducts = () => readJSON(productsJsonPath);
export const writeProducts = (content) => writeJSON(productsJsonPath, content);
export const readReviews = () => readJSON(reviewsJsonPath);
export const writeReviews = (content) => writeJSON(reviewsJsonPath, content);
