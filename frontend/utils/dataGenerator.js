import { faker } from '@faker-js/faker';

export class TheaterDataGenerator {
	constructor() {
		this.pools = {
			venues: [],
			shows: [],
			productions: [],
			people: [],
			sponsors: [],
			performances: [],
			photos: [],
			auditions: [],
			news: [],
			files: [],
		};

		// Static enum choices
		this.roleTypes = [
			'cast', 'director', 'asst_director', 'music_director', 'orchestra_member',
			'technical_director', 'stage_manager', 'asst_stage_manager', 'executive_producer',
			'producer', 'stagehand', 'set_designer', 'set_builder', 'lighting_designer',
			'sound_designer', 'costume_designer', 'projection_designer', 'props_master',
			'choreographer', 'fight_coordinator', 'intimacy_coordinator', 'sound_engineer',
			'lighting_board_operator', 'sound_board_operator', 'house_manager',
			'box_office_manager', 'publicity_marketing', 'program_designer', 'photographer', 'videographer',
		];

		this.seasons = [
			'2027-28', '2026-27', '2025-26', '2024-25', '2023-24', '2022-23', '2021-22',
			'2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16', '2014-15',
			'2013-14', '2012-13', '2011-12', '2010-11', '2009-10', '2008-09', '2007-08',
			'2006-07', '2005-06',
		];

		this.contentWarnings = [
			'violence', 'graphic_violence', 'stage_combat', 'gunshots_loud_noises', 'blood_effects',
			'death_dying', 'sexual_content', 'nudity', 'simulated_intimacy', 'drug_use',
			'alcohol_use', 'smoking_vaping', 'suicide_self_harm', 'mental_illness',
			'eating_disorders', 'domestic_violence', 'sexual_assault_abuse', 'child_abuse',
			'racism_racial_slurs', 'homophobia_transphobia', 'misogyny_sexism', 'religious_content',
			'war_military_violence', 'terminal_illness_cancer', 'strobe_lights_flashing',
			'fog_haze_effects', 'strong_language_profanity', 'animal_cruelty', 'body_horror',
			'pregnancy_loss',
		];

		this.usStates = [
			'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID',
			'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
			'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
			'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
		];

		this.sponsorshipLevels = ['level_1', 'level_2', 'leading_role', 'director', 'producer'];
		this.newsStatuses = ['draft', 'published', 'archived'];
		this.productionStatuses = ['upcoming', 'current', 'past'];
	}

	// Common fields for all collections
	createCommonFields() {
		return {
			sort: faker.number.int({ min: 1, max: 1000 }),
			date_created: faker.date.past(),
			date_updated: faker.date.recent(),
			user_created: faker.string.uuid(),
			user_updated: faker.string.uuid(),
		};
	}

	// Generate mock file references
	generateFiles(count = 50) {
		this.pools.files = Array.from({ length: count }, () => ({
			id: faker.string.uuid(),
			filename_download: faker.system.fileName(),
			title: faker.lorem.words(3),
			type: faker.helpers.arrayElement(['image/jpeg', 'image/png', 'application/pdf', 'video/mp4']),
			filesize: faker.number.int({ min: 1000, max: 10000000 }),
			...this.createCommonFields(),
		}));
		return this.pools.files;
	}

	// Generate venues
	generateVenues(count = 10) {
		this.pools.venues = Array.from({ length: count }, () => ({
			id: faker.number.int({ min: 1, max: 10000 }),
			name: `${faker.company.name()} ${faker.helpers.arrayElement(['Theater', 'Playhouse', 'Opera House', 'Center', 'Hall'])}`,
			street_1: faker.location.streetAddress(),
			street_2: faker.helpers.maybe(() => faker.location.secondaryAddress(), { probability: 0.3 }),
			street_3: faker.helpers.maybe(() => faker.location.secondaryAddress(), { probability: 0.1 }),
			city: faker.location.city(),
			zip: faker.location.zipCode(),
			state: faker.helpers.arrayElement(this.usStates),
			description: faker.lorem.paragraphs(2),
			seating_capacity: faker.number.int({ min: 50, max: 2500 }),
			accessibility_notes: faker.lorem.paragraph(),
			slug: faker.helpers.slugify(faker.company.name().toLowerCase()),
			...this.createCommonFields(),
		}));
		return this.pools.venues;
	}

	// Generate shows
	generateShows(count = 25) {
		const musicalTitles = [
			'Hamilton', 'The Lion King', 'Wicked', 'Phantom of the Opera', 'Chicago',
			'Les Misérables', 'Cats', 'Mamma Mia!', 'The Book of Mormon', 'Dear Evan Hansen',
		];

		this.pools.shows = Array.from({ length: count }, () => {
			const isMusical = faker.datatype.boolean();
			const title = isMusical
				? faker.helpers.arrayElement(musicalTitles)
				: `${faker.lorem.words(2).replace(/\b\w/g, l => l.toUpperCase())}`;

			return {
				id: faker.number.int({ min: 1, max: 10000 }),
				name: title,
				book_author: faker.person.fullName(),
				music_author: isMusical ? faker.person.fullName() : null,
				lyrics_author: isMusical ? faker.person.fullName() : null,
				description: faker.lorem.paragraphs(3),
				genre: faker.helpers.arrayElement(['Musical', 'Drama', 'Comedy', 'Tragedy', 'Opera', 'Ballet']),
				rights_holder: faker.company.name(),
				poster_image: faker.helpers.arrayElement(this.pools.files)?.id || null,
				slug: faker.helpers.slugify(title.toLowerCase()),
				duration_minutes: faker.number.int({ min: 90, max: 180 }),
				content_warnings: faker.helpers.arrayElements(this.contentWarnings, { min: 0, max: 5 }).join(','),
				...this.createCommonFields(),
			};
		});
		return this.pools.shows;
	}

	// Generate productions
	generateProductions(count = 30) {
		if (!this.pools.shows.length || !this.pools.venues.length) {
			throw new Error('Generate shows and venues first');
		}

		this.pools.productions = Array.from({ length: count }, () => {
			const openingDate = faker.date.between({ from: '2020-01-01', to: '2025-12-31' });
			const closingDate = faker.date.between({
				from: openingDate,
				to: new Date(openingDate.getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days later
			});

			return {
				id: faker.string.uuid(),
				show: faker.helpers.arrayElement(this.pools.shows).id,
				venue: faker.helpers.arrayElement(this.pools.venues).id,
				ticket_link: faker.internet.url(),
				program_pdf: faker.helpers.arrayElement(this.pools.files)?.id || null,
				slug: faker.helpers.slugify(faker.lorem.words(3)),
				status: faker.helpers.arrayElement(this.productionStatuses),
				opening_date: openingDate,
				closing_date: closingDate,
				is_archived: faker.datatype.boolean({ probability: 0.2 }),
				season: faker.helpers.arrayElement(this.seasons),
				...this.createCommonFields(),
			};
		});
		return this.pools.productions;
	}

	// Generate people
	generatePeople(count = 100) {
		this.pools.people = Array.from({ length: count }, () => {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const middleName = faker.helpers.maybe(() => faker.person.middleName(), { probability: 0.3 });

			return {
				id: faker.string.uuid(),
				first_name: firstName,
				last_name: lastName,
				middle_name: middleName,
				preferred_display_name: faker.helpers.maybe(() =>
					`${firstName} "${faker.person.firstName()}" ${lastName}`,
				{ probability: 0.2 },
				),
				email: faker.internet.email({ firstName, lastName }),
				phone_number: faker.phone.number(),
				bio: faker.lorem.paragraphs(2),
				headshot: faker.helpers.arrayElement(this.pools.files)?.id || null,
				year_joined: faker.number.int({ min: 2005, max: 2024 }),
				is_hidden: faker.datatype.boolean({ probability: 0.1 }),
				...this.createCommonFields(),
			};
		});
		return this.pools.people;
	}

	// Generate sponsors
	generateSponsors(count = 20) {
		this.pools.sponsors = Array.from({ length: count }, () => ({
			id: faker.number.int({ min: 1, max: 10000 }),
			name: faker.company.name(),
			logo: faker.helpers.arrayElement(this.pools.files)?.id || null,
			program_ad: faker.helpers.arrayElement(this.pools.files)?.id || null,
			website_url: faker.internet.url(),
			description: faker.lorem.paragraph(),
			sponsorship_level: faker.helpers.arrayElement(this.sponsorshipLevels),
			...this.createCommonFields(),
		}));
		return this.pools.sponsors;
	}

	// Generate performances
	generatePerformances(count = 150) {
		if (!this.pools.productions.length) {
			throw new Error('Generate productions first');
		}

		this.pools.performances = Array.from({ length: count }, () => {
			const production = faker.helpers.arrayElement(this.pools.productions);
			const performanceDate = faker.date.between({
				from: production.opening_date,
				to: production.closing_date,
			});

			return {
				id: faker.string.uuid(),
				production: production.id,
				is_sold_out: faker.datatype.boolean({ probability: 0.15 }),
				performance_datetime: performanceDate,
				notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }),
				video: faker.helpers.maybe(() =>
					faker.helpers.arrayElement(this.pools.files)?.id,
				{ probability: 0.1 },
				),
				...this.createCommonFields(),
			};
		});
		return this.pools.performances;
	}

	// Generate auditions
	generateAuditions(count = 15) {
		if (!this.pools.venues.length) {
			throw new Error('Generate venues first');
		}

		this.pools.auditions = Array.from({ length: count }, () => {
			const datetime1 = faker.date.future();
			const datetime2 = faker.date.between({
				from: datetime1,
				to: new Date(datetime1.getTime() + 7 * 24 * 60 * 60 * 1000),
			});

			return {
				id: faker.number.int({ min: 1, max: 10000 }),
				venue: faker.helpers.arrayElement(this.pools.venues).id,
				datetime_1: datetime1,
				datetime_2: datetime2,
				callbacks_datetime_1: faker.helpers.maybe(() =>
					faker.date.between({
						from: datetime2,
						to: new Date(datetime2.getTime() + 7 * 24 * 60 * 60 * 1000),
					}),
				{ probability: 0.7 },
				),
				callbacks_datetime_2: faker.helpers.maybe(() =>
					faker.date.between({
						from: datetime2,
						to: new Date(datetime2.getTime() + 7 * 24 * 60 * 60 * 1000),
					}),
				{ probability: 0.5 },
				),
				title: `${faker.lorem.words(2)} Auditions`,
				description: faker.lorem.paragraphs(2),
				signup_url: faker.internet.url(),
				...this.createCommonFields(),
			};
		});
		return this.pools.auditions;
	}

	// Generate news
	generateNews(count = 40) {
		this.pools.news = Array.from({ length: count }, () => {
			const title = faker.lorem.sentence();

			return {
				id: faker.string.uuid(),
				title,
				slug: faker.helpers.slugify(title.toLowerCase()),
				summary: faker.lorem.paragraph(),
				content: faker.lorem.paragraphs(5),
				featured_image: faker.helpers.arrayElement(this.pools.files)?.id || null,
				status: faker.helpers.arrayElement(this.newsStatuses),
				is_pinned: faker.datatype.boolean({ probability: 0.1 }),
				...this.createCommonFields(),
			};
		});
		return this.pools.news;
	}

	// Generate photos
	generatePhotos(count = 200) {
		this.pools.photos = Array.from({ length: count }, () => ({
			id: faker.number.int({ min: 1, max: 100000 }),
			photo_file: faker.helpers.arrayElement(this.pools.files)?.id || faker.string.uuid(),
			caption: faker.lorem.sentence(),
			credit: faker.person.fullName(),
			...this.createCommonFields(),
		}));
		return this.pools.photos;
	}

	// Generate cast/crew relationships
	generateCastCrew(count = 300) {
		if (!this.pools.productions.length || !this.pools.people.length) {
			throw new Error('Generate productions and people first');
		}

		return Array.from({ length: count }, () => ({
			id: faker.string.uuid(),
			production: faker.helpers.arrayElement(this.pools.productions).id,
			person: faker.helpers.arrayElement(this.pools.people).id,
			role_name: faker.helpers.arrayElement([
				'Hamlet', 'Lady Macbeth', 'Elphaba', 'Jean Valjean', 'Sound Designer',
				'Lighting Designer', 'Stage Manager', 'Director', 'Choreographer',
			]),
			show_bio: faker.lorem.paragraph(),
			role_type: faker.helpers.arrayElement(this.roleTypes),
			...this.createCommonFields(),
		}));
	}

	// Generate many-to-many relationships
	generateRelationships() {
		const relationships = {};

		// Auditions-Productions
		relationships.auditions_productions = this.pools.auditions.flatMap(audition =>
			faker.helpers.arrayElements(this.pools.productions, { min: 1, max: 3 })
				.map(production => ({
					id: faker.number.int({ min: 1, max: 100000 }),
					auditions_id: audition.id,
					productions_id: production.id,
				})),
		);

		// News-Productions
		relationships.news_productions = this.pools.news.flatMap(news =>
			faker.helpers.arrayElements(this.pools.productions, { min: 0, max: 2 })
				.map(production => ({
					id: faker.number.int({ min: 1, max: 100000 }),
					news_id: news.id,
					productions_id: production.id,
				})),
		);

		// Sponsors-Productions
		relationships.sponsors_productions = this.pools.sponsors.flatMap(sponsor =>
			faker.helpers.arrayElements(this.pools.productions, { min: 1, max: 5 })
				.map(production => ({
					id: faker.number.int({ min: 1, max: 100000 }),
					sponsors_id: sponsor.id,
					productions_id: production.id,
				})),
		);

		// Photos relationships
		relationships.photos_people = this.pools.photos.flatMap(photo =>
			faker.helpers.arrayElements(this.pools.people, { min: 0, max: 3 })
				.map(person => ({
					id: faker.number.int({ min: 1, max: 100000 }),
					photos_id: photo.id,
					people_id: person.id,
				})),
		);

		relationships.photos_productions = this.pools.photos.flatMap(photo =>
			faker.helpers.arrayElements(this.pools.productions, { min: 0, max: 2 })
				.map(production => ({
					id: faker.number.int({ min: 1, max: 100000 }),
					photos_id: photo.id,
					productions_id: production.id,
				})),
		);

		relationships.photos_performances = this.pools.photos.flatMap(photo =>
			faker.helpers.arrayElements(this.pools.performances, { min: 0, max: 1 })
				.map(performance => ({
					id: faker.number.int({ min: 1, max: 100000 }),
					photos_id: photo.id,
					performances_id: performance.id,
				})),
		);

		relationships.photos_venues = this.pools.photos.flatMap(photo =>
			faker.helpers.arrayElements(this.pools.venues, { min: 0, max: 1 })
				.map(venue => ({
					id: faker.number.int({ min: 1, max: 100000 }),
					photos_id: photo.id,
					venues_id: venue.id,
				})),
		);

		// Auditions-Files
		relationships.auditions_files = this.pools.auditions.flatMap(audition =>
			faker.helpers.arrayElements(this.pools.files, { min: 0, max: 3 })
				.map(file => ({
					id: faker.number.int({ min: 1, max: 100000 }),
					auditions_id: audition.id,
					directus_files_id: file.id,
				})),
		);

		return relationships;
	}

	// Generate complete dataset
	generateCompleteDataset(options = {}) {
		const {
			venues = 8,
			shows = 20,
			productions = 25,
			people = 80,
			sponsors = 15,
			performances = 120,
			auditions = 12,
			news = 30,
			photos = 150,
			castCrew = 250,
			files = 100,
		} = options;

		console.log('Generating theater dataset...');

		// Generate in dependency order
		this.generateFiles(files);
		console.log(`✓ Generated ${files} files`);

		this.generateVenues(venues);
		console.log(`✓ Generated ${venues} venues`);

		this.generateShows(shows);
		console.log(`✓ Generated ${shows} shows`);

		this.generateProductions(productions);
		console.log(`✓ Generated ${productions} productions`);

		this.generatePeople(people);
		console.log(`✓ Generated ${people} people`);

		this.generateSponsors(sponsors);
		console.log(`✓ Generated ${sponsors} sponsors`);

		this.generatePerformances(performances);
		console.log(`✓ Generated ${performances} performances`);

		this.generateAuditions(auditions);
		console.log(`✓ Generated ${auditions} auditions`);

		this.generateNews(news);
		console.log(`✓ Generated ${news} news articles`);

		this.generatePhotos(photos);
		console.log(`✓ Generated ${photos} photos`);

		const castCrewData = this.generateCastCrew(castCrew);
		console.log(`✓ Generated ${castCrew} cast/crew relationships`);

		const relationships = this.generateRelationships();
		console.log('✓ Generated relationship tables');

		return {
			// Core entities
			files: this.pools.files,
			venues: this.pools.venues,
			shows: this.pools.shows,
			productions: this.pools.productions,
			people: this.pools.people,
			sponsors: this.pools.sponsors,
			performances: this.pools.performances,
			auditions: this.pools.auditions,
			news: this.pools.news,
			photos: this.pools.photos,
			cast_crew: castCrewData,

			// Relationship tables
			...relationships,
		};
	}

	// Generate realistic scenarios
	generateScenario(scenarioType = 'full_season') {
		switch (scenarioType) {
			case 'full_season':
				return this.generateCompleteDataset({
					venues: 3,
					shows: 6,
					productions: 6,
					people: 50,
					sponsors: 10,
					performances: 36,
					auditions: 8,
					news: 20,
					photos: 100,
					castCrew: 150,
				});

			case 'community_theater':
				return this.generateCompleteDataset({
					venues: 2,
					shows: 4,
					productions: 4,
					people: 30,
					sponsors: 6,
					performances: 20,
					auditions: 4,
					news: 12,
					photos: 60,
					castCrew: 80,
				});

			case 'large_company':
				return this.generateCompleteDataset({
					venues: 5,
					shows: 15,
					productions: 20,
					people: 150,
					sponsors: 25,
					performances: 200,
					auditions: 15,
					news: 50,
					photos: 300,
					castCrew: 400,
				});

			default:
				return this.generateCompleteDataset();
		}
	}
}

// Export convenience function
export function generateTheaterData(scenario = 'full_season') {
	const generator = new TheaterDataGenerator();
	return generator.generateScenario(scenario);
}