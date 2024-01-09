import Audio from '../assets/png/audio.png';
import Photography from '../assets/png/photography.png';
import HandphoneAndAccessories from '../assets/png/handphone_and_accessories.png';
import Hobbies from '../assets/png/hobbies.png';
import Watches from '../assets/png/watches.png';
import ComputerAndAccessories from '../assets/png/computer_and_accessories.png';
import HomeAppliances from '../assets/png/home_appliances.png';
import Others from '../assets/png/others.png';

const CATEGORY_ITEMS = [
  {
    imgUrl: Audio,
    name: 'Audio',
    path: 'category?categoryName=Audio',
  },
  {
    imgUrl: Photography,
    name: 'Fotografi',
    path: 'category?categoryName=Fotografi',
  },
  {
    imgUrl: HandphoneAndAccessories,
    name: 'Handphone & Aksesoris',
    path: 'category?categoryName=Handphone%20&%20Aksesoris',
  },
  {
    imgUrl: Hobbies,
    name: 'Hobi',
    path: 'category?categoryName=Hobi',
  },
  {
    imgUrl: Watches,
    name: 'Jam Tangan',
    path: 'category?categoryName=Jam%20Tangan',
  },
  {
    imgUrl: ComputerAndAccessories,
    name: 'Komputer & Aksesoris',
    path: 'category?categoryName=Komputer%20&%20Aksesoris',
  },
  {
    imgUrl: HomeAppliances,
    name: 'Peralatan Rumah Tangga',
    path: 'category?categoryName=Peralatan%20Rumah%20Tangga',
  },
  {
    imgUrl: Others,
    name: 'Lainnya',
    path: 'category?categoryName=Lainnya',
  },
];

export default CATEGORY_ITEMS;
