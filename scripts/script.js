// Находим форму в DOM
let formElement = document.querySelector('.modal__content'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('#modal__input-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('#modal__input-position');// Воспользуйтесь инструментом .querySelector()

let nameText = document.querySelector('.profile__name');
let jobText = document.querySelector('.profile__position');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    console.log(nameInput.value);
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    nameText.textContent = nameInput.value;
    jobText.textContent = jobInput.value;
    modalElement.classList.remove('modal__opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

let editButtonElement = document.querySelector('.profile__edit-button');
let modalElement = document.querySelector('.modal__overlay');

function editButtonHandler (evt) {
    evt.preventDefault();
    modalElement.classList.add('modal__opened');
}

editButtonElement.addEventListener('click', editButtonHandler);

let closeButtonElement = document.querySelector('.modal__close');
function closeButtonHandler (evt) {
    evt.preventDefault();
    modalElement.classList.remove('modal__opened');
}

closeButtonElement.addEventListener('click', closeButtonHandler);
