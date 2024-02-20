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
        this.stub = this.createStub();
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
            textContent = "Loading image");
        return stub;
    }
    // Метод создающий картинку
    createImage() {
        // Избегание потери контекста
        const self = this;
        /*При создании через document.create картинка подгружается асинхронно.
        По этой причине можно подвестиь слушатель на событие загрузки или ошибки.*/
        const image = document.createElement("img");
        // Слушатель ошибки
        // на асинхронном коде try-catch не работают, потому событием
        image.addEventListener("error", function () {
            self.stub.textContent = "Failed loading!";
        });
        image.src = this.pathToImage;
        image.alt = this.altImage;
        return image;
    }
    // Метод, навешивающий слушатели на картинку
    finalyImage() {
        // переменная для избегания потери контекста
        const self = this;
        const image = this.createImage();
        // помещение заглушки на место картинки
        this.imageContainer.append(self.stub);
        // условие для работы в тестовом режиме и нет
        if (this.timeout == 0) {
            // Слушатель загрузки
            image.addEventListener("load", function () {
                //Очистка места логотипа от блока заглушки
                self.imageContainer.innerHTML = '';
                // Помещение на его места картинки
                self.imageContainer.append(image);
            });
        }
        else {
            // Слушатель с задержкой появления картинки
            image.addEventListener("load", function () {
                //Демонстрация работы подгрузки
                setTimeout(function () {
                    if (self.stub.textContent != "Failed loading!") {
                        //Очистка места логотипа от блока заглушки
                        self.imageContainer.innerHTML = '';
                        // Помещение на его места картинки
                        self.imageContainer.append(image);
                    }
                }, self.timeout);
            });
            // Ломающий ссылку на картинку слушатель, для теста ошибки
            self.stub.addEventListener("click", function () {
                image.src = "#";
                self.stub.textContent = "Failed loading!";
            });
        }
    }
}
// получение контейнера для картинки логотипа
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
elem = null;
// Блок продающих картинок
// Большая картинка блюда
const bigFoodImageContainer = document.querySelector(".bigFoodImage");
const bigFoodimage = new LoadingImage(bigFoodImageContainer, "img/bigFoodImage.svg", "bigfood", 4000);
bigFoodimage.finalyImage();
// Маленькая картинка блюда
const orderImageContainer = document.querySelector(".orderImage");
const orderImage = new LoadingImage(orderImageContainer, "img/bigFoodImage.svg", "order image", 4000);
orderImage.finalyImage();
// График 
const shaduleContainer = document.querySelector(".shadule");
const shadule = new LoadingImage(shaduleContainer, "img/shadule.png", "shadule", 3500);
shadule.finalyImage();
// Рисунок снизу
const downDrawingContainer = document.querySelector(".downDrawing");
const downDrawing = new LoadingImage(downDrawingContainer, "img/downDrawing.svg", "down draw", 1000);
downDrawing.finalyImage();
// Рисунок сверху
const topDrawingContainer = document.querySelector(".topDrawing");
const topDrawing = new LoadingImage(topDrawingContainer, "img/topDrawing.svg", "top draw", 1000);
topDrawing.finalyImage();
// Стрелка сверху
const topArrowContainer = document.querySelector(".topArrowDrawing");
const topArrow = new LoadingImage(topArrowContainer, "img/topArrowDrawing.svg", "arrow", 1500);
topArrow.finalyImage();
//# sourceMappingURL=mainPageScript.js.map