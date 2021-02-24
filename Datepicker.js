function Datepicker(opts = {}) {
    const defaultOptions = {
        el: null,
        selector: '.datepicker',
        lang: 'ru',
        format: 'ymd his',
        outputFormat: 'ymd his',
        dateSeparator: '-',
        timeSeparator: ':',
        weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortenedMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        styleMode: 'datetime',
        size: 'small',
        popup: 'true',
    };

    const defaultLang = {
        weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortenedMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        calendar: 'Calendar',
        dateName: 'Date',
        timeName: 'Time',
        clearName: 'Clear',
        chooseName: 'Choose',
        todayName: 'Today',
        shortenedDate: 'Day',
        shortenedMonth: 'Month',
        shortenedYear: 'Year',
        shortenedHour: 'Hour',
        shortenedMin: 'Min',
        shortenedSec: 'Sec',
    };

    const images = {
        arrowTop: `<svg class='datePicker-arrowTop' width="14" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7l6-6 6 6" stroke="#000084"/></svg>`,
        arrowRight: `<svg class='datePicker-arrowRight' width="9" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l7 7.5L1 16" stroke="#000084"/></svg>`,
        arrowBottom: `<svg class='datePicker-arrowBottom' width="14" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L7 7 1 1" stroke="#000084"/></svg>`,
        arrowLeft: `<svg class='datePicker-arrowLeft' width="9" height="17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 16L1 8.5 8 1" stroke="#000084"/></svg>`,
        close: `<svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.375" cy="15.375" r="13.875" fill="#fff"/><path d="M15 30C6.74 30 0 23.26 0 15S6.74 0 15 0s15 6.74 15 15-6.74 15-15 15zm0-27.123C8.301 2.877 2.877 8.3 2.877 15 2.877 21.699 8.3 27.123 15 27.123c6.699 0 12.123-5.424 12.123-12.123C27.123 8.301 21.7 2.877 15 2.877z" fill="#828CA0"/><path d="M21.833 19.583L10.5 8.25l-2.005 2.005 11.333 11.333 2.005-2.005z" fill="#828CA0"/><path d="M19.583 8.167L8.25 19.5l2.005 2.005 11.333-11.333-2.005-2.005z" fill="#828CA0"/></svg>`,
    }
    const dateRanges = {
        year: {
            min: 1900,
            max: 2500
        },
        month: {
            min: 1,
            max: 12
        },
        day: {
            min: 1,
            max: 31
        },
        hours: {
            min: 0,
            max: 23
        },
        minutes: {
            min: 0,
            max: 59
        },
        seconds: {
            min: 0,
            max: 59
        },
    };

    const validations = {
        'range': function (value, min, max) {
            return (+value <= +max) && (+value >= +min);
        },
        'onlyNumbers': function (value) {
            let regexp = /\D/i;
            return regexp.test(value) ? false : true;
        },
        'validateDay': function (value) {
            let countDaysInMonth = new MomentDate().getCountDaysInMonth(date);
            return +value <= countDaysInMonth;
        }
    };

    const actions = {
        'prevYear': function () {
            let year = date.getFullYear();
            year--;
            date.setFullYear(year);
            this.updateDataDateVars();
        },
        'nextYear': function () {
            let year = date.getFullYear();
            year++;
            date.setFullYear(year);
            this.updateDataDateVars();
        },
        'prevMonth': function () {
            let month = date.getMonth();
            month--;
            if (month < 0) {
                month = 11;
            }
            date.setMonth(month);
            this.updateDataDateVars();
        },
        'nextMonth': function () {
            let month = date.getMonth();
            let countDaysInMonth = new MomentDate().getCountDaysInMonth(date);
            let day = date.getDate();
            let nextMonth = new Date(date.getFullYear(), month + 1, 1);
            let countDaysInNextMonth = new MomentDate().getCountDaysInMonth(nextMonth);

            month++;

            if (month > 11) {
                month = 0;
            }

            if (day == countDaysInMonth) {
                date.setDate(Math.min(countDaysInNextMonth, countDaysInMonth));
            }

            date.setMonth(month);

            this.updateDataDateVars();
        },
        'prevDay': function () {
            let countDaysInMonth = new MomentDate().getCountDaysInMonth(date);
            let day = date.getDate();
            day--;
            if (day < 1) {
                day = countDaysInMonth;
            }
            date.setDate(day);
            this.updateDataDateVars();
        },
        'nextDay': function () {
            let countDaysInMonth = new MomentDate().getCountDaysInMonth(date);
            let day = date.getDate();
            day++;

            if (day > countDaysInMonth) {
                day = 1;
            }
            date.setDate(day);
            this.updateDataDateVars();
        },
        'setYear': function (args) {
            let year = args > dateRanges.year.min ? args : args + dateRanges.year.min;
            date.setFullYear(year);
            this.updateDataDateVars();
        },
        'setMonth': function (args) {
            date.setMonth(args - 1);
            this.updateDataDateVars();
        },
        'setDay': function (args) {
            date.setDate(args);
            this.updateDataDateVars();
        },
        'setHours': function (args) {
            date.setHours(args);
            this.updateDataDateVars();
        },
        'setMinutes': function (args) {
            date.setMinutes(args);
            this.updateDataDateVars();
        },
        'setSeconds': function (args) {
            date.setSeconds(args);
            this.updateDataDateVars();
        },
        'prevHours': function () {
            let hours = date.getHours();
            hours--;
            if (hours < 0) {
                hours = 23;
            }
            date.setHours(hours);
            this.updateDataDateVars();
        },
        'nextHours': function () {
            let hours = date.getHours();
            hours++;
            if (hours > 23) {
                hours = 0;
            }
            date.setHours(hours);
            this.updateDataDateVars();
        },
        'prevMinutes': function () {
            let minutes = date.getMinutes();
            minutes--;
            if (minutes < 0) {
                minutes = 59;
            }
            date.setMinutes(minutes);
            this.updateDataDateVars();
        },
        'nextMinutes': function () {
            let minutes = date.getMinutes();
            minutes++;
            if (minutes > 59) {
                minutes = 0;
            }
            date.setMinutes(minutes);
            this.updateDataDateVars();
        },
        'prevSeconds': function () {
            let seconds = date.getSeconds();
            seconds--;
            if (seconds < 0) {
                seconds = 59;
            }
            date.setSeconds(seconds);
            this.updateDataDateVars();
        },
        'nextSeconds': function () {
            let seconds = date.getSeconds();
            seconds++;
            if (seconds > 59) {
                seconds = 0;
            }
            date.setSeconds(seconds);
            this.updateDataDateVars();
        },
        'setViewDatetime': function () {
            resetDatepickerContainerClassNames();
            //datepickerContainer.classList.add('datetime');
            datepickerContainer.classList.add('first-tab');
        },
        'setViewTime': function () {
            resetDatepickerContainerClassNames();
            //datepickerContainer.classList.add('time');
            datepickerContainer.classList.add('second-tab');
        },
        'setValueInput': function () {
            if (element) {
                element.value = new MomentDate(date).format(options.outputFormat);
                element.dispatchEvent(new Event("input"))
                element.dispatchEvent(new Event("change"))
                this.hide();
            }

        },
        'setToday': function () {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth();
            let day = today.getDate();
            let hour = today.getHours();
            let minute = today.getMinutes();
            let second = today.getSeconds();

            date.setFullYear(year);
            date.setMonth(month);
            date.setDate(day);
            date.setHours(hour);
            date.setMinutes(minute);
            date.setSeconds(second);


            this.updateDataDateVars();
            element.value = new MomentDate(date).format(options.outputFormat);
            this.hide();
        },
        'close': function () {
            this.hide();
        },
        'setClear': function () {
            element.value = '';
            this.hide();
        }
    };

    let dataDateVars = {
        YEAR: {
            name: 'year',
            value: 0
        },
        MONTH: {
            name: 'month',
            value: 0,
        },
        DAY: {
            name: 'day',
            value: 0
        },
        HOURS: {
            name: 'hours',
            value: 0
        },
        MINUTES: {
            name: 'minutes',
            value: 0
        },
        SECONDS: {
            name: 'seconds',
            value: 0
        }
    };

    let date = null,
        element = null,
        activeInput = null,

        datepicker = null,
        datepickerContainer = null,
        datepickerContent = null,

        options = {},

        lang,
        datePickerLang;


    this.init = function () {
        options = Object.assign({}, defaultOptions, opts);

        date = options.date
            ? new MomentDate().isDate(options.date)
                ? options.date
                : new MomentDate(options.date, {format: options.format}).getDate()
            : new Date();

        lang = options.lang;

        datePickerLang = window.i18n && window.i18n[lang]
            ? Object.assign({}, defaultLang, window.i18n[lang])
            : defaultLang;

        datepicker = createDatepickerWrapper();
        this.hide();

        this.updateDatepickerContent();
        this.updateDataDateVars();

        document.body.appendChild(datepicker);
        addEventListeners.apply(this);
    }

    this.getDate = function () {
        return date;
    }

    this.setDate = function (dt) {
        if (!new MomentDate().isDate(dt)) {
            throw Error('Incorrect date');
        }

        date = dt;
    }

    this.updateOptions = function () {
        let dataOptions = this.getDataOptions();
        options = Object.assign({}, defaultOptions, opts, dataOptions);
    }

    this.update = function () {
        //console.log("this.update -> update")
        datepicker.innerHTML = '';

        //this.updateOptions();

        datepickerContainer = createDatepickerContainer();
        datepicker.appendChild(datepickerContainer);

        this.updateDatepickerContent();
        this.updateDataDateVars();
    }

    this.getDataOptions = function () {
        if (!element) {
            return {};
        }

        let dataOptions = {};
        let dataset = element.dataset;
        if (dataset['styleMode'] == 'date') {
            dataOptions.outputFormat = 'dmy';
            dataOptions.format = 'dmy';
        } else if (dataset['styleMode'] == 'time') {
            dataOptions.outputFormat = 'his';
            dataOptions.format = 'his';
        } else if (dataset['styleMode'] == 'datetime') {
            dataOptions.outputFormat = 'dmy his';
            dataOptions.format = 'dmy his';
        }
        for (let key in dataset) {
            dataOptions[key] = dataset[key];
        }
        //console.log("this.getDataOptions -> dataOptions", dataOptions)
        return dataOptions;
    }

    this.show = function () {
        datepicker.classList.remove('hide')
    }

    this.showNearbyInput = function () {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        let container = datepicker.firstChild;
        let coords = element.getBoundingClientRect();
        if (scrollHeight - coords.y < 550) {
            datepicker.classList.remove('hide');
            return;
        }
        datepicker.classList.remove('hide');
        container.style.position = 'absolute';
        container.style.left = coords.x + 'px';
        container.style.top = coords.y + coords.height + 10 + 'px';
    }

    this.hide = function () {
        datepicker.classList.add('hide')
    }

    this.updateDatepickerContent = function () {
        datepickerContent.innerHTML = getDatepickerContent(date);
    }

    this.updateDataDateVars = function () {
        let parsedDate = getParsedDate(date);

        dataDateVars['YEAR'].value = parsedDate.year;
        dataDateVars['MONTH'].value = parsedDate.nameMonth;
        dataDateVars['DAY'].value = parsedDate.fullDate;
        dataDateVars['HOURS'].value = parsedDate.fullHours;
        dataDateVars['MINUTES'].value = parsedDate.fullMinutes;
        dataDateVars['SECONDS'].value = parsedDate.fullSeconds;

        for (let key in dataDateVars) {
            let value = dataDateVars[key].value;
            let name = dataDateVars[key].name;

            this.updateValueElements(name, value);
        }
    }

    this.updateValueElements = function (dataDateVar, value) {
        let elements = datepickerContainer.querySelectorAll('[data-date-var="' + dataDateVar + '"]');
        elements.forEach(element => {
            let tagName = element.tagName;
            switch (tagName) {
                case 'INPUT':
                    element.value = value;
                    break;
                default:
                    element.innerHTML = value;
            }
        })
    }

    function createDatepickerWrapper() {
        let datepicker = document.createElement('div');
        datepicker.className = 'datePicker-wrapper';
        datepickerContainer = createDatepickerContainer();
        datepicker.appendChild(datepickerContainer);

        if (options.size === 'medium') {
            datepicker.style.setProperty('--datePickerSize', 14 + 'px');
        } else if (options.size === 'large') {
            datepicker.style.setProperty('--datePickerSize', 16 + 'px');
        } else if (options.size === 'small') {
            datepicker.style.setProperty('--datePickerSize', 12 + 'px');
        }
        return datepicker;
    }

    function createDatepickerContainer() {
        let datepickerContainer = document.createElement('div');
        datepickerContainer.className = 'datePicker-container first-tab ' + options.styleMode;
        datepickerContainer.innerHTML = `<div class='datePicker-close' data-action="close">${images.close}</div>`;

        datepickerContainer.appendChild(createDatepickerTabs());
        datepickerContainer.appendChild(createDatepickerNavigation());
        datepickerContainer.appendChild(getDatepickerWeekdays());

        datepickerContent = createDatepickerContent();
        datepickerContainer.appendChild(datepickerContent);
        datepickerContainer.appendChild(createDateSwitcherContainer());
        datepickerContainer.appendChild(createTimepickerContainer());
        datepickerContainer.appendChild(createDatepickerButtons());

        switch (options.styleMode) {
            case 'datetime':
                datepickerContainer.classList.add('datetime');
                break;
            case 'date':
                datepickerContainer.classList.add('date');
                break;
            case 'time':
                datepickerContainer.classList.add('time');
                break;
            case 'years':
                datepickerContainer.classList.add('years');
                break;
        }

        return datepickerContainer;
    }

    function createDatepickerTabs() {
        let datepickerTabs = document.createElement('div');
        datepickerTabs.className = 'datePicker-tabs';
        let text = '';
        if (options.styleMode !== 'time') {
            text = datePickerLang.dateName;

        } else {
            text = datePickerLang.timeName;
        }
        datepickerTabs.innerHTML = `
        <div class="dataPicker-tabs__buttons" data-tab-name="tab-1" data-action="setViewDatetime">${datePickerLang.calendar}</div>
        <div class="dataPicker-tabs__buttons" data-tab-name="tab-2" data-action="setViewTime">${text}</div>
      
    `;

        return datepickerTabs;
    }

    function createDatepickerNavigation() {
        let datepickerNavigation = document.createElement('div');
        datepickerNavigation.className = "calendar-navigation";
        datepickerNavigation.innerHTML = `
    <div class="calendar-title">
        <div class="calendar-month__prev" data-action="prevMonth">
          ${images.arrowLeft}
        </div>
        <span data-date-var="${dataDateVars['MONTH'].name}">${dataDateVars['MONTH'].value}</span>
        <div class="calendar-month__next" data-action="nextMonth">
          ${images.arrowRight}
        </div>
    </div>
    <div class="calendar-subtitle">
        <div class="calendar-year__prev" data-action="prevYear">
          ${images.arrowLeft}
        </div>
        <span data-date-var="${dataDateVars['YEAR'].name}">${dataDateVars['YEAR'].value}</span>
        <div class="calendar-year__next" data-action="nextYear">
          ${images.arrowRight}
        </div>
    </div>
    `;

        return datepickerNavigation;
    }

    function getDatepickerWeekdays() {
        let datepickerWeekdays = document.createElement('div');
        datepickerWeekdays.className = "calendar-weekdays";
        datepickerWeekdays.innerHTML = '<div>' + datePickerLang.weekDays.join('</div><div>') + '</div>';

        return datepickerWeekdays;
    }

    function createDatepickerContent() {
        let datepickerContent = document.createElement('div');
        datepickerContent.className = "calendar-content";
        datepickerContent.innerHTML = ``;

        return datepickerContent;
    }

    function createTimepickerContainer() {
        let timepickerContainer = document.createElement('div');
        timepickerContainer.className = "timePicker-container";
        timepickerContainer.innerHTML = `
    <div class="timePicker-hours timePicker-item">
        <div class="datePicker-arrowTop" data-action="nextHours"></div>
        <input value="${dataDateVars['HOURS'].value}" data-date-var="${dataDateVars['HOURS'].name}" data-action="setHours" data-min="${dateRanges.hours.min}" data-max="${dateRanges.hours.max}">
        <div class="datePicker-arrowBottom" data-action="prevHours"></div>
        <div class="timePicker-title">${datePickerLang.shortenedHour}</div>
    </div>
    <div class="timePicker-minutes timePicker-item">
        <div class="datePicker-arrowTop" data-action="nextMinutes"></div>
        <input value="${dataDateVars['MINUTES'].value}" data-date-var="${dataDateVars['MINUTES'].name}" data-action="setMinutes" data-min="${dateRanges.minutes.min}" data-max="${dateRanges.minutes.max}">
        <div class="datePicker-arrowBottom" data-action="prevMinutes"></div>
        <div class="timePicker-title">${datePickerLang.shortenedMin}</div>
    </div>
    <div class="timePicker-seconds timePicker-item">
        <div class="datePicker-arrowTop" data-action="nextSeconds"></div>
        <input value="${dataDateVars['SECONDS'].value}" data-date-var="${dataDateVars['SECONDS'].name}" data-action="setSeconds" data-min="${dateRanges.seconds.min}" data-max="${dateRanges.seconds.max}">
        <div class="datePicker-arrowBottom" data-action="prevSeconds"></div>
        <div class="timePicker-title">${datePickerLang.shortenedSec}</div>
    </div>
    `;

        return timepickerContainer;
    }

    function createDateSwitcherContainer() {
        let dateswitcherContainer = document.createElement('div');
        dateswitcherContainer.className = "dateSwitcher-container date-switch";
        dateswitcherContainer.innerHTML = `
    <div class="date-switch__item date-switch__days">
        <div class="datePicker-arrowTop" data-action="nextDay"></div>
        <input value="${dataDateVars['DAY'].value}" data-date-var="${dataDateVars['DAY'].name}" data-action="setDay" data-min="${dateRanges.day.min}" data-max="${dateRanges.day.max}">
        <div class="datePicker-arrowBottom" data-action="prevDay"></div>
        <div class="date-switch__item-title">${datePickerLang.shortenedDate}</div>
    </div>
    <div class="date-switch__item date-switch__months">
        <div class="datePicker-arrowTop" data-action="nextMonth"></div>
        <input value="${dataDateVars['MONTH'].value}" data-date-var="${dataDateVars['MONTH'].name}" data-action="setMonth" data-min="${dateRanges.month.min}" data-max="${dateRanges.month.max}">
        <div class="datePicker-arrowBottom" data-action="prevMonth"></div>
        <div class="date-switch__item-title">${datePickerLang.shortenedMonth}</div>
    </div>
    <div class="date-switch__item date-switch__years">
        <div class="datePicker-arrowTop" data-action="nextYear"></div>
        <input value="${dataDateVars['YEAR'].value}" data-date-var="${dataDateVars['YEAR'].name}" data-action="setYear" data-min="${dateRanges.year.min}" data-max="${dateRanges.year.max}">
        <div class="datePicker-arrowBottom" data-action="prevYear"></div>
        <div class="date-switch__item-title">${datePickerLang.shortenedYear}</div>
    </div>
    `;

        return dateswitcherContainer;
    }

    function createDatepickerButtons() {
        let datepickerButtons = document.createElement('div');
        datepickerButtons.className = "datePicker-buttons";
        datepickerButtons.innerHTML = `
      <button class="datePicker-choose" data-action="setValueInput">${datePickerLang.chooseName}</button>
      <button class="datePicker-today" data-action="setToday">${datePickerLang.todayName}</button>
      <button class="datePicker-clear" data-action="setClear">${datePickerLang.clearName}</button>
    `;

        return datepickerButtons;
    }

    function getDatepickerContent(d) {
        let date = d.getDate();
        let firstDayOfMonth = new MomentDate().getNumberFirstDayOfMonth(d);
        let lastDayOfMonth = new MomentDate().getLastDayOfMonth(d);
        let diff = firstDayOfMonth ? firstDayOfMonth - 1 : 6;
        let prevLastDay = new Date(
            d.getFullYear(),
            d.getMonth(),
            0
        ).getDate();
        let lastDayIndex = new Date(
            d.getFullYear(),
            d.getMonth() + 1,
            0
        ).getDay();

        let nextDays = 7 - lastDayIndex;

        let html = '';

        for (let i = diff; i > 0; i--) {
            html += `<div class="prev-date"><span>${prevLastDay - i + 1}</span></div>`
        }

        for (let i = 1; i <= lastDayOfMonth; i++) {
            let classActive = date == i ? 'active' : '';
            html += '<div data-action="setDay" data-value="' + i + '" class="thisMonthDays ' + classActive + '"><span>' + i + '</span></div>';
        }
        for (let i = 1; i <= nextDays; i++) {
            html += `<div class="next-date"><span>${i}</span></div>`
        }


        return html;
    }

    function addEventListeners() {
        let self = this;

        document.addEventListener('click', function (e) {
            let targetInput = e.target.closest(options.selector);
            let targetDatePickerWrapper = e.target.closest('.datePicker-wrapper');
            let targetDatePickerContainer = e.target.closest('.datePicker-container');

            if (targetDatePickerContainer) {
                return;
            }

            if (targetDatePickerWrapper) {
                self.hide();
                return;
            }

            if (targetInput) {
                element = targetInput;


                self.updateOptions();

                date = new MomentDate(targetInput.value, {format: options.format}).getDate();
                self.update();
                //console.log(options.popup)
                if (options.popup === 'false') {
                    self.showNearbyInput();
                } else {
                    self.show();
                }
                return;
            }
        })

        datepicker.addEventListener('click', function (e) {
            let targetAction = e.target.closest('[data-action]');

            if (!targetAction || targetAction.tagName == 'INPUT') {
                return;
            }

            e.stopPropagation();

            let action = targetAction.dataset.action ? targetAction.dataset.action : '';

            if (actions[action]) {
                let value = targetAction.dataset.value ? targetAction.dataset.value : '';
                actions[action].apply(self, [value]);
                self.updateDatepickerContent();
            }
        });

        datepicker.addEventListener('click', function (e) {
            let target = e.target.closest('[data-date-var]');

            if (!target || target.tagName !== 'INPUT') {
                return;
            }
            target.oldValue = target.value;
            activeInput = target;
            target.select();
        });

        datepicker.addEventListener('input', function (e) {
            let target = e.target.closest('[data-date-var]');

            if (!target) {
                return;
            }

            let min = +target.dataset.min;
            let max = +target.dataset.max;
            let value = +target.value;
            let dataDateVar = target.dataset.dateVar;

            if (!validations.onlyNumbers(value)) {
                target.value = target.value.replace(/\D/g, '');
                return;
            }

            if (!validations.range(value, 0, max)) {
                //let countNumbers = value.match(/\d/gi).length;
                //target.value = Math.trunc(value / 10);
                target.value = target.oldValue;
                return;
            }

            if (dataDateVar == 'day' && !validations.validateDay(value)) {
                //target.value = Math.trunc(value / 10);
                target.value = target.oldValue;
                return;
            }

            target.oldValue = target.value;
        });

        datepicker.addEventListener('change', function (e) {
            let target = e.target.closest('[data-date-var]');

            if (!target) {
                return;
            }

            let action = target.dataset.action;
            let min = +target.dataset.min;
            let max = +target.dataset.max;
            let value = +target.value;

            if (!validations.range(value, min, max)) {
                target.value = min;
            }

            actions[action].apply(self, [value]);

            activeInput = null;
        });

        datepicker.addEventListener('wheel', function (e) {
            let target = e.target.closest('.calendar-content');

            if (!target) {
                return;
            }

            e.preventDefault();

            if (e.deltaY > 0) {
                actions['prevMonth'].apply(self);
            } else {
                actions['nextMonth'].apply(self);
            }

            self.updateDatepickerContent();
        });

        document.addEventListener('keydown', function (e) {
            if (!activeInput) {
                return;
            }

            let sibling;

            if (e.code == "ArrowUp") {
                sibling = e.target.previousElementSibling;
            }

            if (e.code == "ArrowDown") {
                sibling = e.target.nextElementSibling;
            }

            if (sibling) {
                let action = sibling.dataset.action ? sibling.dataset.action : '';
                if (actions[action]) {
                    let value = sibling.dataset.value ? sibling.dataset.value : '';
                    actions[action].apply(self, [value]);
                    self.updateDatepickerContent();
                }
            }
        });

        datepicker.addEventListener('wheel', function (e) {
            let target = e.target.closest('[data-date-var]');
            if (!target) {
                return;
            }

            e.preventDefault();

            let sibling;

            if (e.deltaY > 0) {
                sibling = e.target.previousElementSibling;
            } else {
                sibling = e.target.nextElementSibling;
            }

            let action = sibling.dataset.action ? sibling.dataset.action : '';
            if (actions[action]) {
                let value = sibling.dataset.value ? sibling.dataset.value : '';
                actions[action].apply(self, [value]);
                self.updateDatepickerContent();
            }
        });
    }

    function resetDatepickerContainerClassNames() {
        datepickerContainer.className = 'datePicker-container ' + options.styleMode;
    }

    function getParsedDate(date) {
        //console.log('dateNew ->', date)
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            fullMonth: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, // One based
            nameMonth: datePickerLang.shortenedMonths[date.getMonth()],
            date: date.getDate(),
            fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            day: date.getDate(),
            hours: date.getHours(),
            fullHours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            minutes: date.getMinutes(),
            fullMinutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            seconds: date.getSeconds(),
            fullSeconds: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        }
    }

    function MomentDate(dt, opts) {
        let date = null;
        let options = {};

        let defaultOptions = {
            dateSeparator: '-',
            timeSeparator: ':',
            format: 'ymd his',
            outputFormat: 'ymd his',
            fillZero: true
        };

        let errorRules = [
            {
                rule: /(d){3,}|(m){3,}|(h){3,}|(i){3,}|(s){3,}/i,
                error: 'The symbol \'{{s}}\' has been used more than twice.'
            },
            {
                rule: /(y){5,}/i,
                error: 'The symbol \'{{s}}\' has been used more than four times.'
            },
            {
                rule: /(d)+[^d]+\1/i,
                error: 'A character sequence \'{{s}}\' should only be used once.'
            },
            {
                rule: /(m)+[^m]+\1/i,
                error: 'A character sequence \'{{s}}\' should only be used once.'
            },
            {
                rule: /(y)+[^y]+\1/i,
                error: 'A character sequence \'{{s}}\' should only be used once.'
            },
            {
                rule: /(h)+[^h]+\1/i,
                error: 'A character sequence \'{{s}}\' should only be used once.'
            },
            {
                rule: /(i)+[^i]+\1/i,
                error: 'A character sequence \'{{s}}\' should only be used once.'
            },
            {
                rule: /(s)+[^s]+\1/i,
                error: 'A character sequence \'{{s}}\' should only be used once.'
            },
            {
                rule: /^[^ymdhis]/gi,
                error: ''
            },
            {
                rule: /[^ymdhis]$/gi,
                error: ''
            },
        ];

        let dateElements = [
            {
                name: 'year',
                symbol: 'y'
            },
            {
                name: 'month',
                symbol: 'm'
            },
            {
                name: 'day',
                symbol: 'd'
            },
            {
                name: 'hours',
                symbol: 'h'
            },
            {
                name: 'minutes',
                symbol: 'i'
            },
            {
                name: 'seconds',
                symbol: 's'
            },
        ];

        this.init = function () {
            options = Object.assign({}, defaultOptions, opts);

            if (this.isDate(dt)) {
                date = dt;
                return;
            }

            date = this.createDateObject(dt, options.format);
        }

        this.getDate = function () {
            return date;
        }

        this.setDate = function (dt) {
            if (this.isDate(dt)) {
                date = dt;
            } else {
                throw Error('The passed object is not a date object.')
            }
        }

        this.validateFormat = function (format) {
            if (typeof format !== 'string') {
                throw new Error('The format must be of string type.');
            }

            let validate = true;
            let error = 'Invalid date format.';

            errorRules.forEach(er => {
                if (format.match(er.rule)) {
                    let match = format.match(er.rule)[1];
                    error += ' ' + er.error.replace(/{{s}}/, match);
                    validate = false;
                    return;
                }
            });

            if (!validate) {
                throw new Error(error);
            }

            return true;
        }

        this.getParsedFormat = function (format) {
            format = format.toLowerCase();
            try {
                this.validateFormat(format);
            } catch (e) {
                console.log(e);
                return;
            }

            let parsedFormat = [];
            let regexps = [];
            dateElements.forEach((el) => {
                regexps.push(`(?<${el.name}>${el.symbol}+)`);
            });

            let regexp = regexps.join('|');
            let matches = format.matchAll(regexp);

            for (let match of matches) {
                dateElements.forEach((el) => {
                    if (match.groups[el.name]) {
                        parsedFormat.push({
                            index: match.index,
                            name: el.name
                        });
                    }
                });

                parsedFormat.sort((a, b) => {
                    return a.index > b.index;
                })
            }

            return parsedFormat;
        }

        this.createDateObject = function (strDate, format) {
            if (!strDate || !format) {
                return new Date();
            }

            try {
                this.validateFormat(format);
            } catch (e) {
                console.log(e)
            }

            let parsedFormat = this.getParsedFormat(format);
            let parsedStrDate = strDate.match(/\d+/g);

            for (let i = 0; i < parsedFormat.length; i++) {
                if (parsedStrDate[i]) {
                    parsedFormat[i].value = +parsedStrDate[i];
                } else {
                    parsedFormat[i].value = 0;
                }
            }

            let date = new Date();

            dateElements.forEach(el => {
                let value;
                let item = parsedFormat.find(p => {
                    if (el.name == p.name) {
                        return true;
                    }

                    return false;
                });

                value = item ? item.value : 0;

                switch (el.name) {
                    case 'year':
                        date.setFullYear(value);
                        break;
                    case 'month':
                        date.setMonth(value - 1);
                        break;
                    case 'day':
                        date.setDate(value);
                        break;
                    case 'hours':
                        date.setHours(value);
                        break;
                    case 'minutes':
                        date.setMinutes(value);
                        break;
                    case 'seconds':
                        date.setSeconds(value);
                        break;
                }
            })

            return date;
        }

        this.format = function (outputFormat) {
            if (!date) {
                throw 'Date object is null';
            }
            let formatDate = '';
            let format = outputFormat ? outputFormat : options.outputFormat;
            let parsedFormat = this.getParsedFormat(format);

            let dates = [];
            let times = [];

            parsedFormat.forEach((p, i) => {
                let name = p.name;
                switch (name) {
                    case 'year':
                        value = date.getFullYear();
                        dates.push(value);
                        break
                    case 'month':
                        value = date.getMonth() + 1;
                        value = options.fillZero ? fillZeroValue(value) : value;
                        dates.push(value);
                        break
                    case 'day':
                        value = date.getDate();
                        value = options.fillZero ? fillZeroValue(value) : value;
                        dates.push(value);
                        break
                    case 'hours':
                        value = date.getHours();
                        value = options.fillZero ? fillZeroValue(value) : value;
                        times.push(value);
                        break
                    case 'minutes':
                        value = date.getMinutes();
                        value = options.fillZero ? fillZeroValue(value) : value;
                        times.push(value);
                        break
                    case 'seconds':
                        value = date.getSeconds();
                        value = options.fillZero ? fillZeroValue(value) : value;
                        times.push(value);
                        break
                }

            });

            formatDate = dates.join(options.dateSeparator) + " " + times.join(options.timeSeparator);

            return formatDate.trim();
        }

        this.isDate = function (date) {
            return typeof date === 'object' && date.getDate;
        }

        this.getCountDaysInMonth = function (date) {
            if (!this.isDate(date)) {
                throw Error('The passed object is not a date object.')
            }

            return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        }

        this.getNumberFirstDayOfMonth = function (date) {
            if (!this.isDate(date)) {
                throw Error('The passed object is not a date object.')
            }
            let year = date.getFullYear();
            let month = date.getMonth();

            return new Date(year, month, 1).getDay();
        }

        this.getLastDayOfMonth = function (date) {
            if (!this.isDate(date)) {
                throw Error('The passed object is not a date object.')
            }
            let year = date.getFullYear();
            let month = date.getMonth();

            return new Date(year, month + 1, 0).getDate();
        }

        fillZeroValue = function (value) {
            return value < 10 ? '0' + value : '' + value;
        }

        this.init();
    }

    this.init();
}