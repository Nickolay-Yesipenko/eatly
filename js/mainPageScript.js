"use strict";
/*Класс для проверки и имитации прогрузки картинок*/
class LoadingImage {
    // Свойства класса по умолчанию не определены
    // Передаваемый контейнер сам содержит ограничивающие размеры
    imageContainer = undefined;
    pathToImage = undefined;
    altImage = undefined;
    // Задержка, если ее нужно имитировать
    timeout = undefined;
    // Блок заглушка, появляющийся на месте картинки при сбоях загрузки или долгой загрузке
    stub = undefined;
    constructor(container, path, alt, timeout = 0) {
        this.imageContainer = container;
        this.pathToImage = path;
        this.altImage = alt;
        this.timeout = timeout;
    }
    // Метод Возвращающий заглушку
    createStub() {
        const stub = document.createElement("div");
        stub.style.display = "flex";
        stub.style.justifyContent = "center";
        stub.style.alignItems = "center";
        stub.style.fontSize = "12px";
        stub.style.userSelect = "none";
        stub.append(document.
            createElement("div").
            textContent = "Loading Logo");
        return stub;
    }
    // Метод создающий картинку
    createImage() {
        /*При создании через document.create картинка подгружается асинхронно.
        По этой причине можно подвестиь слушатель на событие загрузки или ошибки.*/
        const image = document.createElement("img");
        image.src = this.pathToImage;
        image.alt = this.altImage;
        return image;
    }
    // Метод, навешивающий слушатели на картинку
    finalyImage() {
        // переменная для избегания потери контекста
        const self = this;
        const image = this.createImage();
        const stub = this.createStub();
        // помещение заглушки на место картинки
        this.imageContainer.append(stub);
        // условие для работы в тестовом режиме и нет
        if (this.timeout == 0) {
            // Слушатель загрузки
            image.addEventListener("load", function () {
                //Очистка места логотипа от блока заглушки
                self.imageContainer.innerHTML = '';
                // Помещение на его места картинки
                self.imageContainer.append(image);
            });
            // Слушатель ошибки
            // на асинхронном коде try-catch не работают, потому событием
            image.addEventListener("error", function () {
                stub.textContent = "Failed loading!";
            });
        }
        else {
            // Слушатель с задержкой появления картинки
            image.addEventListener("load", function () {
                //Демонстрация работы подгрузки
                setTimeout(function () {
                    if (stub.textContent != "Failed loading!") {
                        //Очистка места логотипа от блока заглушки
                        self.imageContainer.innerHTML = '';
                        // Помещение на его места картинки
                        self.imageContainer.append(image);
                    }
                }, self.timeout);
            });
            // Ломающий ссылку на картинку слушатель, для теста ошибки
            stub.addEventListener("click", function () {
                image.src = "#";
                stub.textContent = "Failed loading!";
            });
        }
    }
}
// получение контейнера для картинки
const logoContainer = document.querySelector(".mainLogo");
// Вариант для логотипа компании с тестом
const logoImage = new LoadingImage(logoContainer, "img/mainLogo.svg", "logo", 2000);
logoImage.finalyImage();
const rateLogoContainer = document.querySelector(".rateLogo");
// Вариант для логотипа рейтиногового сервиса с тестом
const rateLogo = new LoadingImage(rateLogoContainer, "img/trustpilot.svg", "logo", 1500);
rateLogo.finalyImage();
// Вариант для кучи звездочек
// Создаем контейнеры для звездочек оценки
let i = 0;
let stars = [];
for (i; i < 5; i++) {
    // Созадем блок для картинки и настраеваем отступ
    const block = document.createElement("div");
    block.style.marginRight = "5px";
    stars.push(block);
}
i = null;
// Получаем контейнер для этих контейнеров
const starsContainer = document.querySelector(".starImagesTitle1");
let elem;
for (elem of stars) {
    // Добавляем созданый div
    starsContainer.append(elem);
    const iteration = new LoadingImage(elem, "img/starimage.svg", "star", 1000);
    iteration.finalyImage();
}
//# sourceMappingURL=mainPageScript.js.map