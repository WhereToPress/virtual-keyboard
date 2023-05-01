// Добавляем textarea на страницу
const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
document.body.appendChild(textarea);

// Определяем массив строк клавиатуры
const keyboardRows = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl']
];

// Определяем массив специальных клавишей
const specialKeys = ['Backspace', 'Tab', 'Delete', 'Enter', 'CapsLock', 'Shift', 'Shift', 'Ctrl', 'Ctrl', 'Win', 'Alt', 'Alt', 'Space'];

// Определяем массив клавишей специальных символов (Идея не реализована)
// const specialSymbols = ['`', '-', '=', '\\', ';', '\'', ',', '.', '/' ];

// Определяем массив кнопок подверженных CapsLock
const capsLockKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

// Создаем общий элемент клавиатуры
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

// Создаем ряды для кнопок клавиатуры и добавляем их на страницу
keyboardRows.forEach(row => {
  const rowElement = document.createElement('div');
  rowElement.classList.add('keyboard-row');

  // Создаем кнопки клавиатуры и добавляем их в соответстыующий ряд
  row.forEach(key => {
    const button = document.createElement('button');

    // Добавляем уникальный ID на основе содержимого кнопки
    button.id = `key-${key}`;
    rowElement.appendChild(button);

    // Присваиваем каждой кнопке класс 'key'
    button.classList.add('key');

    // Проверяем, является ли текущая кнопка специальной и добавляем ей дополнительный класс 'special'
    if (specialKeys.includes(key)) {
      button.classList.add('special');
    };
    // Проверяем, подвержена ли кнопка увеличению символа при нажатом CapsLock, добавляем ей дополнительный класс 'capslockKey'
    if (capsLockKeys.includes(key)) {
      button.classList.add('capslockKey');
    };
    // Проверяем, является ли текущая кнопка собственно кнопкой CapsLock добавляем ей дополнительный класс
    // if (key === 'CapsLock') {
    //   button.classList.add('toggle');
    // };
    // Присваиваем текст кнопке, который соответствует символу клавиши
    button.textContent = key;

    // Добавляем кнопку в текущую строку
    rowElement.appendChild(button);
  });
  // Добавляем сформированный элемент rowElement, который содержит в себе кнопки клавиатуры, в элемент keyboard 
  keyboard.appendChild(rowElement);
});

// Добавляем клавиатуру на страницу
document.body.appendChild(keyboard);

// Функционал печати кнопок из экранной клавиатуры в текстэриа
keyboard.addEventListener('click', e => { // добавляем обработчик кликов на клавиатуру
  if (e.target.matches('.key')) { // если клик был на кнопке клавиатуры
    insertTextAtCursor(textarea, e.target.textContent); // вставляем текст из кнопки в текстовое поле
  }
});

function insertTextAtCursor(textarea, specKeyName) { // функция вставки текста в текстовое поле
  const startPos = textarea.selectionStart; // получаем позицию начала выделенного текста или позицию курсора, если текст не выделен
  const endPos = textarea.selectionEnd; // получаем позицию конца выделенного текста или позицию курсора, если текст не выделен
    
  // Проверка является ли нажатая кнопка специальной
  // Если нажатая кнопка - специальная, выполнение функции прекращается
  if (specialKeys.includes(specKeyName)) {
    switch (specKeyName) {
      case 'Backspace':
        handleBackspace()
        break;
      case 'Delete':
        handleDelete()
        break;
      case 'Tab' :
        handleTab()
        break;
      case 'CapsLock' :
        handleCapsLock()
        break;
      case 'Enter' :
        handleEnter()
        break;
      case 'Space' :
        handleSpace()
        break;
      default:
        break;
    };
    textarea.focus();
    return;
  };
  // Если нажатая кнопка - обычная, ее значение добавляется в текстовое поле
  textarea.value = textarea.value.substring(0, startPos) + specKeyName + textarea.value.substring(endPos); // заменяем выделенный текст на новый или вставляем новый текст в позицию курсора
  textarea.selectionStart = startPos + 1; // устанавливаем новую позицию курсора после вставки текста
  textarea.selectionEnd = startPos + 1; // устанавливаем новую позицию курсора после вставки текста
  textarea.focus(); // устанавливаем фокус на текстовое поле
};

function handleBackspace() {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  if (startPos === endPos && startPos > 0) {
    textarea.value = textarea.value.substring(0, startPos - 1) + textarea.value.substring(endPos);
    textarea.selectionStart = startPos - 1;
    textarea.selectionEnd = startPos - 1;
    textarea.focus();
  } else {
    textarea.value = textarea.value.substring(0, startPos) + textarea.value.substring(endPos);
    textarea.selectionStart = startPos;
    textarea.selectionEnd = startPos;
    textarea.focus();
  };
};
function handleTab() {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  textarea.value = textarea.value.substring(0, startPos) + "    " + textarea.value.substring(endPos);
  textarea.selectionStart = startPos + 4;
  textarea.selectionEnd = startPos + 4;
  textarea.focus();
};
function handleDelete() {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  if (startPos === endPos && startPos < textarea.value.length) {
    textarea.value = textarea.value.substring(0, startPos) + textarea.value.substring(endPos + 1);
    textarea.selectionStart = startPos;
    textarea.selectionEnd = startPos;
    textarea.focus();
  } else {
    textarea.value = textarea.value.substring(0, startPos) + textarea.value.substring(endPos);
    textarea.selectionStart = startPos;
    textarea.selectionEnd = startPos;
    textarea.focus();
  };
};
function handleCapsLock() {
  const capsLockKey = document.getElementById('key-CapsLock')
  capsLockKey.classList.toggle("activeCapsLock");
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    const keyContent = key.textContent;
    if (keyContent.length === 1 && keyContent.toUpperCase() === keyContent) {
      key.textContent = keyContent.toLowerCase();
    } else if (keyContent.length === 1 && keyContent.toLowerCase() === keyContent) {
      key.textContent = keyContent.toUpperCase();
    }
  });
};
function handleEnter() {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  textarea.value = textarea.value.substring(0, startPos) + "\n" + textarea.value.substring(endPos);
  textarea.selectionStart = startPos + 1;
  textarea.selectionEnd = startPos + 1;
  textarea.focus();
};
function handleSpace() {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  textarea.value = textarea.value.substring(0, startPos) + " " + textarea.value.substring(endPos);
  textarea.selectionStart = startPos + 1;
  textarea.selectionEnd = startPos + 1;
  textarea.focus();
};

//Функционал печати с физической клавиатуры
const isKeyPressed = {};

document.addEventListener('keydown', event => {
  const key = document.querySelector(`#key-${event.key}`);
  
  if (key) {
    insertTextAtCursor(textarea, key.textContent);
    event.preventDefault();
    key.classList.add('pressed');
    if (event.key === "CapsLock") {
      handleCapsLock();
      if (key && !isKeyPressed[key.id]) {
        isKeyPressed[key.id] = true;
      }
    }
  }
});

document.addEventListener('keyup', event => {
  const key = document.querySelector(`#key-${event.key}`);
  if (key) {
    key.classList.remove('pressed');
    if (event.key === "CapsLock") {
      handleCapsLock();
    }
  }
});