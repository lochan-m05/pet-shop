// API Keys
const DOG_API_KEY = 'live_Q26X573GzlXYtR8ILVMOc2aNBjjMNoSXEvncEpszUy2LRogZb49IOA08xkzWQ5pn'; // Get your free key from https://thedogapi.com/
const CAT_API_KEY = 'live_FQltx30PxCTtpFdvlaUMYmTwoYh0XZUEh453Skm00mRc1PW0bQCZ7B3qQqazRqpq'; // Get your free key from https://thecatapi.com/

// Function to fetch pet data from multiple APIs
async function fetchPetData() {
    const petsGrid = document.querySelector('.pets-grid');
    
    try {
        // Fetch a random dog breed with fallback
        let dogData = null;
        try {
            const dogResponse = await fetch('https://api.thedogapi.com/v1/breeds/random', {
                headers: {
                    'x-api-key': DOG_API_KEY
                }
            });
            dogData = await dogResponse.json();
        } catch (error) {
            console.log('Using fallback data for random dog');
            dogData = {
                name: 'Labrador Retriever',
                temperament: 'Friendly, Active, Outgoing',
                life_span: '10-12 years',
                bred_for: 'Water retrieving',
                breed_group: 'Sporting',
                reference_image_id: 'B1uW7l5VX'
            };
        }

        // Fetch German Shepherd info with fallback
        let gsdData = null;
        try {
            const gsdResponse = await fetch('https://api.thedogapi.com/v1/breeds/search?q=German%20Shepherd', {
                headers: {
                    'x-api-key': DOG_API_KEY
                }
            });
            const gsdArray = await gsdResponse.json();
            gsdData = gsdArray[0];
        } catch (error) {
            console.log('Using fallback data for German Shepherd');
            gsdData = {
                name: 'German Shepherd',
                temperament: 'Alert, Loyal, Obedient, Intelligent',
                life_span: '10-13 years',
                bred_for: 'Herding, Guard dog',
                height: { imperial: '22 - 26' },
                reference_image_id: 'SJyBfg5NX'
            };
        }

        // Fetch Persian cat info with fallback
        let persianData = null;
        try {
            const catResponse = await fetch('https://api.thecatapi.com/v1/breeds/search?q=Persian', {
                headers: {
                    'x-api-key': CAT_API_KEY
                }
            });
            const catArray = await catResponse.json();
            persianData = catArray[0];
        } catch (error) {
            console.log('Using fallback data for Persian cat');
            persianData = {
                name: 'Persian',
                temperament: 'Gentle, Quiet, Sweet',
                origin: 'Iran (Persia)',
                life_span: '14-15 years',
                description: 'Known for their long flowing coats and calm personalities'
            };
        }

        // Update the pets grid with fetched or fallback data
        updatePetsGrid(dogData, gsdData, persianData);
    } catch (error) {
        console.error('Error in fetchPetData:', error);
        updatePetsGridWithFallbackData();
    }
}

// Function to update the pets grid with fetched data
function updatePetsGrid(labData, gsdData, persianData) {
    const petCards = document.querySelectorAll('.pet-card');
    
    // Update Random Dog card
    updatePetCard(petCards[0], {
        name: labData.name || 'Discover Dog Breeds',
        image: labData.reference_image_id ? 
            `https://cdn2.thedogapi.com/images/${labData.reference_image_id}.jpg` : 
            'images/lab-yellow.jpg',
        description: labData.temperament ? 
            `${labData.name} is known for being ${labData.temperament.toLowerCase()}.` :
            'Discover various dog breeds and their unique characteristics.',
        details: {
            'life-span': labData.life_span || 'Unknown',
            'bred-for': labData.bred_for || 'Various purposes',
            'breed-group': labData.breed_group || 'Not specified'
        }
    });

    // Update German Shepherd card
    updatePetCard(petCards[1], {
        name: 'German Shepherd',
        image: gsdData.reference_image_id ?
            `https://cdn2.thedogapi.com/images/${gsdData.reference_image_id}.jpg` :
            'images/german-shepherd.jpg',
        description: gsdData.temperament ?
            `German Shepherds are ${gsdData.temperament.toLowerCase()}.` :
            'German Shepherds are known for their intelligence and loyalty.',
        details: {
            'life-span': gsdData.life_span || '10-13 years',
            'bred-for': gsdData.bred_for || 'Herding, Guard dog',
            'height': gsdData.height ? `${gsdData.height.imperial} inches` : '22-26 inches'
        }
    });

    // Update Persian Cat card
    updatePetCard(petCards[2], {
        name: 'Persian Cat',
        image: 'images/persian-cat.jpg',
        description: persianData.description || 'Persian cats are known for their distinctive appearance and gentle nature.',
        details: {
            'origin': persianData.origin || 'Iran (Persia)',
            'life-span': persianData.life_span || '14-15 years',
            'temperament': persianData.temperament || 'Gentle, Quiet, Sweet'
        }
    });

    // Rabbit card remains static
    updatePetCard(petCards[3], {
        name: 'Rabbit',
        image: 'images/rabbit.jpg',
        description: 'Rabbits are wonderful companions known for their gentle nature and unique personalities.',
        details: {
            'life-span': '8-12 years',
            'diet': 'Hay and vegetables',
            'space': 'Indoor/Outdoor'
        }
    });
}

// Function to update individual pet cards
function updatePetCard(card, data) {
    if (!card) return;

    const image = card.querySelector('.pet-image img');
    const title = card.querySelector('h3');
    const description = card.querySelector('p');
    const details = card.querySelectorAll('.detail-item span:not(.detail-item)');

    if (image && data.image) {
        image.src = data.image;
        image.onerror = function() {
            // If image fails to load, use fallback image
            this.src = 'images/' + data.name.toLowerCase().replace(' ', '-') + '.jpg';
        };
    }
    if (title) title.textContent = data.name;
    if (description) description.textContent = data.description;

    // Update details if they exist
    if (data.details && details.length > 0) {
        Object.entries(data.details).forEach(([key, value], index) => {
            if (details[index]) {
                details[index].textContent = value;
                details[index].classList.add('loaded');
            }
        });
    }
}

// Fallback function if API calls fail
function updatePetsGridWithFallbackData() {
    const fallbackData = {
        lab: {
            name: 'Discover Dog Breeds',
            image: 'images/lab-yellow.jpg',
            description: 'Explore different dog breeds and learn about their unique traits and characteristics.',
            details: {
                'life-span': '10-13 years',
                'bred-for': 'Various purposes',
                'breed-group': 'Different groups'
            }
        },
        gsd: {
            name: 'German Shepherd',
            image: 'images/german-shepherd.jpg',
            description: 'German Shepherds are intelligent, loyal, and versatile working dogs.',
            details: {
                'life-span': '10-13 years',
                'bred-for': 'Herding, Guard dog',
                'height': '22-26 inches'
            }
        },
        persian: {
            name: 'Persian Cat',
            image: 'images/persian-cat.jpg',
            description: 'Persian cats are gentle, sweet-tempered cats known for their luxurious coats.',
            details: {
                'origin': 'Iran (Persia)',
                'life-span': '14-15 years',
                'temperament': 'Gentle, Quiet, Sweet'
            }
        },
        rabbit: {
            name: 'Rabbit',
            image: 'images/rabbit.jpg',
            description: 'Rabbits are wonderful companions known for their gentle nature and unique personalities.',
            details: {
                'life-span': '8-12 years',
                'diet': 'Hay and vegetables',
                'space': 'Indoor/Outdoor'
            }
        }
    };

    const petCards = document.querySelectorAll('.pet-card');
    updatePetCard(petCards[0], fallbackData.lab);
    updatePetCard(petCards[1], fallbackData.gsd);
    updatePetCard(petCards[2], fallbackData.persian);
    updatePetCard(petCards[3], fallbackData.rabbit);
}

// Initialize pet data when page loads
document.addEventListener('DOMContentLoaded', fetchPetData);

// Refresh pet data every hour to stay within free tier limits
setInterval(fetchPetData, 3600000); // 1 hour in milliseconds 