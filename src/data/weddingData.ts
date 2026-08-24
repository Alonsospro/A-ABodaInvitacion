import { ItineraryItem, LocationDetail } from '../types';

export const WEDDING_CONFIG = {
  couple: {
    bride: 'Andrea',
    groom: 'Alonso',
    title: 'Andrea & Alonso',
    subheading: 'NUESTRA BODA',
    quote: 'El amor no se mira, se siente, y aún más cuando compartimos este momento con quienes más amamos.',
  },
  adultsOnly: {
    tag: 'Celebración Exclusiva',
    title: 'Solo Adultos',
    subtitle: 'Noche de Fiesta & Brindis',
    message: 'Amamos a los más pequeños de la familia; sin embargo, deseamos que todos puedan relajarse, celebrar y disfrutar al máximo de una noche inolvidable. Por ello, nuestra recepción será exclusivamente para adultos.',
    note: 'Agradecemos profundamente su comprensión y cariño.',
  },
  date: {
    weddingDateISO: '2026-10-03 T17:15:00',
    displayDate: 'Sábado, 3 de Octubre de 2026',
    ceremonyTime: '17:15 hrs',
    receptionTime: '20:00 hrs',
    city: 'Santa Cruz de la Sierra, Bolivia',
  },
  dressCode: {
    title: 'Formal Elegante',
    description: 'Agradecemos asistir con vestimenta formal elegante.',
    reservedNote: 'Rogamos tomar en cuenta que los colores BEIGE y BLANCO están reservados exclusivamente para los novios.',
    suggestedColors: [
      { name: 'Azul Marino', hex: '#1E2B37' },
      { name: 'Verde Salvia', hex: '#7A8C74' },
      { name: 'Terracota', hex: '#A85D48' },
      { name: 'Champagne / Taupe', hex: '#B8A690' },
      { name: 'Negro Clásico', hex: '#1A1817' },
    ],
    reservedColors: [
      { name: 'Blanco', hex: '#FFFFFF', isReserved: true },
      { name: 'Beige / Marfil', hex: '#F5EBE1', isReserved: true },
    ],
  },
  gift: {
    title: 'Mesa de Regalos / Lluvia de Sobres',
    phrase: 'El regalo más valioso para nosotros es tu compañía en este día tan especial. Sin embargo, si deseas tener un detalle con nosotros, te agradeceremos profundamente un presente monetario para iniciar nuestro nuevo hogar y luna de miel.',
    qrImagePath: '/img/qr.jpg',
    bankDetails: {
      accountHolder: 'Andrea & Alonso',
      bankName: 'Banco Nacional / Banco Unión',
      accountNumber: '1000-4829-1029-38',
      cbuAlias: 'ANDREA.Y.ALONSO.BODA',
      ciNit: '7482910 SCZ',
    },
  },
  music: {
    filePath: '/music/musica.mp3',
    title: 'Canon in D / Wedding Melodies',
    artist: 'Andrea & Alonso Wedding Theme',
  },
};

export const ITINERARY: ItineraryItem[] = [
  {
    time: '17:15 hrs',
    title: 'Boda Religiosa',
    description: 'Capilla María Auxiliadora',
    iconName: 'church',
  },
  {
    time: '20:00 hrs',
    title: 'Recepción de Fiesta',
    description: 'Salón Superfiesta Villa Fraterna',
    iconName: 'party',
  },
  {
    time: '20:30 hrs',
    title: 'Ingreso de los Novios',
    description: 'Nuestra primera entrada como esposos',
    iconName: 'sparkles',
  },
  {
    time: '21:30 hrs',
    title: 'Brindis',
    description: 'Por una vida llena de amor y felicidad',
    iconName: 'glasses',
  },
  {
    time: '22:00 hrs',
    title: 'Palabras de los Novios',
    description: 'Un momento especial para agradecer a todos',
    iconName: 'heart',
  },
  {
    time: '22:30 hrs',
    title: 'Cena',
    description: 'Banquete especial para celebrar juntos',
    iconName: 'utensils',
  },
  {
    time: '23:00 hrs',
    title: 'Fiesta',
    description: '¡A bailar y celebrar toda la noche!',
    iconName: 'music',
  },
  {
    time: '01:30 hrs',
    title: 'Lanzamiento de Ramo',
    description: '¿Quién será el o la siguiente?',
    iconName: 'flower',
  },
  {
    time: '03:30 hrs',
    title: 'Felices por Siempre',
    description: 'Cierre de una noche inolvidable',
    iconName: 'moon',
  },
];

export const LOCATIONS: LocationDetail[] = [
  {
    id: 'ceremonia',
    type: 'Iglesia / Ceremonia Religiosa',
    name: 'Parroquia María Auxiliadora',
    time: '17:15 hrs',
    address: 'Av. Argentina esq. Av. Don Bosco, frente al parque urbano',
    mapUrl: 'https://maps.app.goo.gl/gjq5bqpmtu3uUTJY8',
    embedQuery: 'Parroquia+Maria+Auxiliadora+Av+Argentina+Santa+Cruz',
    note: 'Favor llegar 15 minutos antes para el inicio puntual de la misa.',
  },
  {
    id: 'recepcion',
    type: 'Salón de Eventos / Recepción',
    name: 'Superfiesta, Villafraterna',
    time: '20:00 hrs',
    address: 'Av. Roca y Coronado entre 4to y 5to anillo zona Villafraterna, frente a la plaza VilasBoas',
    mapUrl: 'https://maps.app.goo.gl/NnNNpQAa1SVfWJ2n9',
    embedQuery: 'Salon+Superfiesta+Villafraterna+Roca+y+Coronado+Santa+Cruz',
  },
];

export const GALLERY_IMAGES = [
  {
    src: '/img/f1.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    title: 'Andrea & Alonso',
    caption: 'El comienzo de nuestra historia para siempre.',
  },
  {
    src: '/img/f2.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    title: 'Miradas que dicen todo',
    caption: 'Cada instante juntos es un tesoro incalculable.',
  },
  {
    src: '/img/f3.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    title: 'Amor y complicidad',
    caption: 'Caminando de la mano hacia el mismo destino.',
  },
  {
    src: '/img/f4.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    title: 'Nuestra promesa',
    caption: 'Un sí que guardaremos en el corazón toda la vida.',
  },
  {
    src: '/img/f5.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    title: 'Sonrisas compartidas',
    caption: 'La alegría de celebrar con las personas que más amamos.',
  },
  {
    src: '/img/f6.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    title: 'Elegancia y ternura',
    caption: 'Detalles que hacen de este día algo único e inolvidable.',
  },
  {
    src: '/img/f7.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    title: 'Cómplices de vida',
    caption: 'Por todas las aventuras que aún están por venir.',
  },
  {
    src: '/img/f8.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80',
    title: 'Unidos para siempre',
    caption: 'Gracias por ser parte de este momento tan soñado.',
  },
];

export const FALLBACK_BACKGROUND = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85';
export const FALLBACK_QR = 'https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=BODA-ANDREA-Y-ALONSO-BANCO-UNION-10004829102938';
