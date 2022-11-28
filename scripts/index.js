// Находим форму в DOM
let formElement = document.querySelector('.popup__body[name="edit-profile"]'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input[name="name"]'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input[name="job"]');// Воспользуйтесь инструментом .querySelector()

let nameText = document.querySelector('.profile__name');
let jobText = document.querySelector('.profile__position');

let editButtonElement = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let closeButtonElement = document.querySelector('.popup__close');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;
    closeButtonHandler(evt);
}

function editButtonHandler(evt) {
    evt.preventDefault();

    nameInput.value = nameText.textContent;
    jobInput.value = jobText.textContent;
    popupElement.classList.add('popup_opened');
}

function closeButtonHandler(evt) {
    evt.preventDefault();
    popupElement.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButtonElement.addEventListener('click', editButtonHandler);
closeButtonElement.addEventListener('click', closeButtonHandler);


const cardsContainer = document.querySelector('.elements');

function addCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardName = cardElement.querySelector('.elements__name');
    const cardImage = cardElement.querySelector('.elements__image');

    cardName.textContent = nameValue;
    cardName.setAttribute('title', nameValue);
    cardImage.setAttribute('src', linkValue);
    cardImage.setAttribute('alt', nameValue);

    cardsContainer.append(cardElement);
}

const initialCards = [
    {
        name: 'Хорген,Швейцария',
        link: './images/ricardo-gomez-angel-eis_TT6ntfo-unsplash.jpg'
    },
    {
        name: 'Нью-Гэмпшир,США',
        link: './images/balazs-busznyak-El5zuQAtfeo-unsplash.jpg'
    },
    {
        name: 'Лаго-ди-Фузине,Италия',
        link: './images/saso-tusar-s-k-2N90yuY-unsplash.jpg'
    },
    {
        name: 'Гатлинбург,США',
        link: './images/chad-madden-cPa-7yByq3o-unsplash.jpg'
    },
    {
        name: 'Ферма Сидр-Хилл,США',
        link: './images/bonnie-kittle-XAsG0EZEsyA-unsplash.jpg'
    },
    {
        name: 'Лак-дю-Фламбо,США',
        link: './images/dave-hoefler-Z9d7CYpBDqo-unsplash.jpg'
    },
];

initialCards.forEach(card => addCard(card.name, card.link));