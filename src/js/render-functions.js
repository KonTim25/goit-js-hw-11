import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; // Импорт стилей

let lightbox; // Переменная для экземпляра SimpleLightbox

// Функция для создания галереи
export const createGallery = (images) => {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(image => `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" class="lightbox">
                <img src="${image.webformatURL}" alt="${image.tags}" />
            </a>
            <div class="image-info">
                <p><strong>Likes</strong> ${image.likes}</p>
                <p><strong>Views</strong> ${image.views}</p>
                <p><strong>Comments</strong> ${image.comments}</p>
                <p><strong>Downloads</strong> ${image.downloads}</p>
            </div>
        </li>
    `).join('');

    gallery.innerHTML = markup; // Добавляем разметку в галерею

    // Инициализация SimpleLightbox
    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt', // Используем атрибут alt для подписи
            captionDelay: 250, // Задержка для подписи
        });
    } else {
        lightbox.refresh(); // Обновляем галерею, если экземпляр уже существует
    }
};

// Функция для очистки галереи
export const clearGallery = () => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Очищаем содержимое галереи
};

// Функция для показа индикатора загрузки
export const showLoader = () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'block'; // Показываем индикатор загрузки
};

// Функция для скрытия индикатора загрузки
export const hideLoader = () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none'; // Скрываем индикатор загрузки
};