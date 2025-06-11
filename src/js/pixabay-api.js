import axios from 'axios';

const API_KEY = '50757194-f2b273e514caa2f992e1a47fc'; // Замените на ваш ключ API

// Функция для получения изображений по запросу
export const getImagesByQuery = async (query) => {
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            },
        });
        return response.data.hits; // Возвращаем массив изображений
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Пробрасываем ошибку
    }
};