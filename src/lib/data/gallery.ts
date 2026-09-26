/**
 * CDN ids (blog/<id>/...) of generic stock photos, not events MEG equipped (user decision
 * 2026-09-25, CLAUDE.md "Honestidad"). Wherever one appears, its caption says it is illustrative
 * and its section never presents it as delivered work: src/lib/data/stock-photos.test.ts guards
 * every post in every language. A photo leaves this list only if the business confirms it is
 * from a real MEG event.
 */
export const STOCK_PHOTO_IDS: readonly string[] = [
	'1625', '1627', '1628', '1629', '1630', '1631', '1632', '1633', '1635', '1636', '1637', '1638',
	'2278', '1313'
];

export interface GalleryImage {
	src: string;
	alt: string;
	category: 'wedding' | 'corporate' | 'general' | 'party';
}

/**
 * ECOC 2026 (52nd European Conference on Optical Communication), FYCMA Malaga,
 * 20 to 24 September 2026. MEG supplied and installed the display screens on the
 * exhibitor stands of the ECOC Exhibition. Exported on its own so the news post can
 * show ONLY this event, and spread into `galleryImages` below so the shots also feed
 * the home marquee and the corporate package rails.
 *
 * `ecoc2026-malaga-spain-8` (blog/3095) is deliberately absent: its published variants
 * came out rotated 90 degrees because the source EXIF orientation was not applied on
 * encode. Re-upload it rotated with FORCE=1 before adding it here.
 */
export const ecoc2026GalleryImages: GalleryImage[] = [
	{
		src: 'https://cdn.malagaeventgear.com/blog/3096/ecoc2026-malaga-spain-4-600x450.webp',
		alt: 'Five display screens installed in a row on an exhibitor stand at ECOC 2026, Malaga',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3099/ecoc2026-malaga-spain-2-600x450.webp',
		alt: 'Three stand screens installed for an exhibitor at the ECOC 2026 exhibition',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3097/ecoc2026-malaga-spain-5-600x450.webp',
		alt: 'Finished ECOC 2026 exhibitor stand with its display screen installed',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3102/ecoc2026-malaga-spain-3-600x450.webp',
		alt: 'Stand display screen installed at the ECOC 2026 exhibition in Malaga',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3098/ecoc2026-malaga-spain-9-600x450.webp',
		alt: 'Technology demonstration screen on an ECOC 2026 exhibitor stand',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3101/ecoc2026-malaga-spain-11-600x450.webp',
		alt: 'Stand screens running live product content at ECOC 2026, Malaga',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3105/ecoc2026-malaga-spain-6-600x450.webp',
		alt: 'Exhibitor crews commissioning their stands at ECOC 2026, FYCMA Malaga',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3106/ecoc2026-malaga-spain-7-600x450.webp',
		alt: 'Exhibitors connecting laptops to their stand screens at ECOC 2026',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3100/ecoc2026-malaga-spain-10-600x450.webp',
		alt: 'Display screens on neighbouring exhibitor stands at ECOC 2026',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3103/ecoc2026-malaga-spain-12-600x450.webp',
		alt: 'Build up on the ECOC 2026 exhibition floor at FYCMA, Malaga',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/3104/ecoc2026-malaga-spain-1-600x450.webp',
		alt: 'Visitors beside a stand display screen at the ECOC 2026 exhibition',
		category: 'corporate'
	}
];

export const galleryImages: GalleryImage[] = [
	// Wedding
	{
		src: 'https://cdn.malagaeventgear.com/blog/1638/wedding_rings_heart_book-600x400.webp',
		alt: 'Wedding ceremony details',
		category: 'wedding'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1632/wedding_reception_decor-600x375.webp',
		alt: 'Elegant wedding reception decor',
		category: 'wedding'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1625/beach_wedding_table_decor-600x400.webp',
		alt: 'Beach wedding table setup and decoration',
		category: 'wedding'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1631/wedding_table_setting-600x400.webp',
		alt: 'Romantic wedding table setting',
		category: 'wedding'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1628/evening_wedding_reception_table-600x400.webp',
		alt: 'Evening wedding dinner table with soft lighting',
		category: 'wedding'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1629/beach_wedding_setup-600x400.webp',
		alt: 'Beautiful beach wedding ceremonial setup',
		category: 'wedding'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1635/indoor_wedding_ceremony_hall-600x400.webp',
		alt: 'Indoor wedding ceremony hall setup',
		category: 'wedding'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1630/tropical_beach_wedding-600x400.webp',
		alt: 'Tropical beach wedding ceremonial arch',
		category: 'wedding'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1636/tropical_beach_wedding_aisle-600x400.webp',
		alt: 'Tropical beach wedding aisle with chairs',
		category: 'wedding'
	},

	// Corporate / MICE
	{
		src: 'https://cdn.malagaeventgear.com/blog/1282/malaga_international_event_av_rental-scaled-600x448.webp',
		alt: 'Malaga international event AV rental system',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/2278/audio-visual-rental-for-virtual-events-in-Malaga-1-600x401.webp',
		alt: 'Illustrative photo of a conference hall with projection screens and a camera on a tripod',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1284/colegio_oficial_gestores_administrativos_malaga_audio_rental_1-scaled-600x448.webp',
		alt: 'Official association meeting audio rental',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/2495/7-years-on-the-Neighborhood-Council-Community-Meeting-600x450.webp',
		alt: 'Community meeting sound setup',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1331/malaga_mice_event_audio_lighting_podium_rental-600x449.webp',
		alt: 'MICE event audio and lighting on stage',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1276/malaga_congress_sound_system_rental-scaled-600x448.webp',
		alt: 'Large scale congress sound system rental at Hotel Alfonso XIII, Sevilla',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1269/hotel_alfonso_xiii_congress_stage-scaled-600x448.webp',
		alt: 'Hotel Alfonso XIII congress stage setup, Sevilla',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1267/volvo_mice_event_setup_1-scaled-600x448.webp',
		alt: 'Volvo corporate event MICE AV setup',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1261/methacrylate_lectern_outdoor_event-600x448.webp',
		alt: 'Methacrylate lectern at outdoor event',
		category: 'corporate'
	},

	// General / Sound / Lighting / Party / FX
	{
		src: 'https://cdn.malagaeventgear.com/blog/1292/malaga_event_lighting_display_projector_sound_rental_3-scaled-600x448.webp',
		alt: 'Professional display, projector, sound system rental',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1297/malaga_event_lighting_sound_system_rental_2-scaled-600x448.webp',
		alt: 'Stunning event lighting and sound installation',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1301/lighting-sound-big-screen-projector-rental-malaga_1-600x450.webp',
		alt: 'Lighting and sound for event screen',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1195/sound-system-tennis-championship-2024-setup-600x338.webp',
		alt: 'Tennis championship sports sound setup',
		category: 'general'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1788/2025-10-05-DJ-audio-and-microphone-system-setup-600x450.webp',
		alt: 'DJ audio and microphone system setup',
		category: 'general'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1289/malaga_event_lighting_display_projector_sound_rental_1-scaled-600x448.webp',
		alt: 'Professional event lighting and projector screen',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1294/malaga_event_lighting_big_display_projector_sound_rental_1-scaled-600x448.webp',
		alt: 'Staging, audio, visual and custom setup',
		category: 'corporate'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1327/malaga_concert_lighting_microphone_audio_rental-scaled-600x448.webp',
		alt: 'Concert lighting, microphone, and audio rental',
		category: 'general'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1275/malaga_sound_system_rental_outdoor_event-scaled-600x448.webp',
		alt: 'Rooftop terrace sound system rental at Hotel Alfonso XIII, Sevilla',
		category: 'general'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1272/malaga_sound_lighting_rental_event-scaled-600x448.webp',
		alt: 'Sound and lighting rental for live band events',
		category: 'general'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1323/rental-audio-system-parties-events-600x448.webp',
		alt: 'Audio system rental setup in Malaga for a beachside party, featuring professional DJ equipment, speakers, and a lively crowd enjoying the event',
		category: 'party'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1324/rent-microphone-parties-concerts-events-malaga-600x803.webp',
		alt: 'Live music performance at an event in Malaga featuring a singer with a professional microphone and a guitarist, creating a vibrant and elegant atmosphere',
		category: 'party'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1325/audio-lighting-sound-system-microphone-rental-malaga-600x803.webp',
		alt: 'A live DJ and guitarist performing on stage with professional audio and lighting equipment during an outdoor event in the province of Malaga',
		category: 'party'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1330/malaga_concert_podium_sound_system-600x803.webp',
		alt: 'Podium and sound system for a concert in the province of Malaga',
		category: 'general'
	},
	{
		src: 'https://cdn.malagaeventgear.com/blog/1787/2025-10-05-at-DJ-audio-and-microphone-system-setup-600x800.webp',
		alt: "Close up of a professional DJ setup with media player and mixer at a woman DJ's event",
		category: 'party'
	},
	...ecoc2026GalleryImages
];

export function getImagesForPackage(packageId: string, excludeSrc: string[] = []): GalleryImage[] {
	let images: GalleryImage[];
	if (packageId === 'wedding') {
		images = galleryImages.filter((img) => img.category === 'wedding');
	} else if (packageId === 'eco') {
		images = galleryImages.filter((img) => img.category === 'general' || img.category === 'party');
	} else {
		// Corporate packs: basic-mice, mice, product-presentation
		images = galleryImages.filter((img) => img.category === 'corporate');
	}
	if (excludeSrc.length === 0) return images;
	return images.filter((img) => !excludeSrc.some((needle) => img.src.includes(needle)));
}
