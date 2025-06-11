import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js'; // Импортируем функции
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const searchText = form.elements['search-text'].value.trim(); // Получаем текст поиска

    // Проверяем, не пустая ли строка поиска
    if (!searchText) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term',
            position: 'topRight',
        });
        return; // Прерываем выполнение, если строка пустая
    }

    clearGallery(); // Очищаем предыдущие результаты
    showLoader(); // Показываем индикатор загрузки

    // Выполняем запрос к API
    getImagesByQuery(searchText)
        .then(images => {
            // Проверка, есть ли изображения в ответе
            if (images.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }

            // Создаем галерею с новыми изображениями
            createGallery(images); 
        })
        .catch(error => {
            // Обработка ошибок при запросе
            iziToast.error({
                message: 'An error occurred while fetching images. Please try again later.',
                position: 'topRight',
            });
        })
        .finally(() => {
            hideLoader(); // Скрываем индикатор загрузки после завершения
        });
    // Очищаем поле ввода после выполнения запроса
    form.elements['search-text'].value = ''; // Очистка поля ввода
});
