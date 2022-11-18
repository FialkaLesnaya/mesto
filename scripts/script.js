// Находим форму в DOM
let formElement = document.querySelector('.popup__form[name="edit-profile"]'); // Воспользуйтесь методом querySelector()
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
