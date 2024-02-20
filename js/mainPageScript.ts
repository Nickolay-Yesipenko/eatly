/*Класс для проверки и имитации прогрузки картинок*/

class LoadingImage {
    // Свойства класса по умолчанию не определены
    // Передаваемый контейнер сам содержит ограничивающие размеры
    private readonly imageContainer: HTMLDivElement = undefined;
    private readonly pathToImage: string = undefined;
    private readonly altImage: string = undefined;
    // Задержка, если ее нужно имитировать
    private readonly timeout: number = undefined;
    // Блок заглушка, появляющийся на месте картинки при сбоях загрузки или долгой загрузке
    private readonly stub: HTMLDivElement = undefined;
    constructor(container: HTMLDivElement, path: string, alt: string, timeout: number = 0) {
        this.imageContainer = container;
        this.pathToImage = path;
        this.altImage = alt;
        this.timeout = timeout;
        this.stub = this.createStub();
    }
    // Метод Возвращающий заглушку
    private createStub(): HTMLDivElement {
        const stub: HTMLDivElement = document.createElement("div");
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
    private createImage(): HTMLImageElement {
        // Избегание потери контекста
        const self = this;
        /*При создании через document.create картинка подгружается асинхронно.
        По этой причине можно подвестиь слушатель на событие загрузки или ошибки.*/
        const image: HTMLImageElement = document.createElement("img");
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
    finalyImage(): void {
        // переменная для избегания потери контекста
        const self = this;
        const image: HTMLImageElement = this.createImage();
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
        } else {
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
            })
            // Ломающий ссылку на картинку слушатель, для теста ошибки
            self.stub.addEventListener("click", function () {
                image.src = "#";
                self.stub.textContent = "Failed loading!";
            });
        }
    }
}

// получение контейнера для картинки логотипа
const logoContainer: HTMLDivElement = document.querySelector(".mainLogo");
// Вариант для логотипа компании с тестом
const logoImage: LoadingImage = new LoadingImage(logoContainer, "img/mainLogo.svg", "logo", 2000);
logoImage.finalyImage();
const rateLogoContainer: HTMLDivElement = document.querySelector(".rateLogo");
// Вариант для логотипа рейтиногового сервиса с тестом
const rateLogo: LoadingImage = new LoadingImage(rateLogoContainer, "img/trustpilot.svg", "logo", 1500);
rateLogo.finalyImage();


// Вариант для кучи звездочек


// Создаем контейнеры для звездочек оценки
let i: number = 0;
let stars: Array<HTMLDivElement> = [];
for (i; i < 5; i++) {
    // Созадем блок для картинки и настраеваем отступ
    const block: HTMLDivElement = document.createElement("div");
    block.style.marginRight = "5px";
    stars.push(block);
}
i = null;
// Получаем контейнер для этих контейнеров
const starsContainer: HTMLDivElement = document.querySelector(".starImagesTitle1");
let elem: HTMLDivElement;
for (elem of stars) {
    // Добавляем созданый div
    starsContainer.append(elem);
    const iteration: LoadingImage = new LoadingImage(elem, "img/starimage.svg", "star", 1000);
    iteration.finalyImage();
}
elem = null;


// Блок продающих картинок


// Большая картинка блюда
const bigFoodImageContainer: HTMLDivElement = document.querySelector(".bigFoodImage");
const bigFoodimage: LoadingImage = new LoadingImage(bigFoodImageContainer, "img/bigFoodImage.svg", "bigfood", 4000);
bigFoodimage.finalyImage();
// Маленькая картинка блюда
const orderImageContainer: HTMLDivElement = document.querySelector(".orderImage");
const orderImage: LoadingImage = new LoadingImage(orderImageContainer, "img/bigFoodImage.svg", "order image", 4000);
orderImage.finalyImage();
// График 
const shaduleContainer: HTMLDivElement = document.querySelector(".shadule");
const shadule: LoadingImage = new LoadingImage(shaduleContainer, "img/shadule.png", "shadule", 3500);
shadule.finalyImage();
// Рисунок снизу
const downDrawingContainer: HTMLDivElement = document.querySelector(".downDrawing");
const downDrawing: LoadingImage = new LoadingImage(downDrawingContainer, "img/downDrawing.svg", "down draw", 1000);
downDrawing.finalyImage();
// Рисунок сверху
const topDrawingContainer: HTMLDivElement = document.querySelector(".topDrawing");
const topDrawing: LoadingImage = new LoadingImage(topDrawingContainer, "img/topDrawing.svg", "top draw", 1000);
topDrawing.finalyImage();
// Стрелка сверху
const topArrowContainer: HTMLDivElement = document.querySelector(".topArrowDrawing");
const topArrow: LoadingImage = new LoadingImage(topArrowContainer, "img/topArrowDrawing.svg", "arrow", 1500);
topArrow.finalyImage();