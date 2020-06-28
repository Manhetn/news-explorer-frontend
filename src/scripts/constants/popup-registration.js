const POPUP_REGISTRATION_CONTENT = `<div class="popup__container popup__container_margin-top_l">
                                      <button
                                        class="popup__close button"
                                        type="button"
                                      >
                                        <svg class="popup__icone-close popup__icone-close_big" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M22.357 20l8.821 8.822-2.357 2.357L18.35 20.707a1 1 0 010-1.414L28.82 8.822l2.357 2.357L22.357 20z" fill="#fff"/>
                                          <path d="M18.13 20l-8.82 8.822 2.356 2.357 10.472-10.472a1 1 0 000-1.414L11.666 8.822 9.31 11.179 18.131 20z" fill="#fff"/>
                                        </svg>
                                        <svg class="popup__icone-close popup__icone-close_little" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M13.4142 12L18.7071 17.2928L17.2929 18.7071L11.2929 12.7071C10.9024 12.3165 10.9024 11.6834 11.2929 11.2928L17.2929 5.29285L18.7071 6.70706L13.4142 12Z" fill="white"/>
                                          <path d="M10.8787 12L5.58577 17.2928L6.99999 18.7071L13 12.7071C13.3905 12.3165 13.3905 11.6834 13 11.2928L6.99999 5.29285L5.58577 6.70706L10.8787 12Z" fill="white"/>
                                        </svg>
                                      </button>
                                      <form
                                        class="popup__form form"
                                        name="registration"
                                        novalidate
                                      >
                                        <fieldset class="popup__fieldset">
                                          <legend class="popup__title popup__title_form">Регистрация</legend>
                                          <label class="popup__label" for="registration-email">Email</label>
                                          <input
                                            class="popup__input popup__input_padding_unequal form__input_email form__input"
                                            type="email"
                                            name="email"
                                            id="registration-email"
                                            placeholder="Введите почту"
                                            pattern="(([a-z0-9]+((_|\.|-)[a-z0-9]+)+)|[a-z0-9]{2,})@[a-z]{2,}(\.[a-z]{2,6})+"
                                            required
                                          />
                                          <span class="popup__error popup__error_invalid-input form__error_email form__error"></span>
                                          <label class="popup__label" for="registration-password">Пароль</label>
                                          <input
                                            class="popup__input popup__input_padding_equal form__input_password form__input"
                                            type="password"
                                            name="password"
                                            id="registration-password"
                                            placeholder="Введите пароль"
                                            minlength="8"
                                            maxlength="30"
                                            required
                                          />
                                          <span class="popup__error popup__error_invalid-input form__error_password form__error"></span>
                                          <label class="popup__label" for="registration-name">Имя</label>
                                          <input
                                            class="popup__input popup__input_padding_unequal form__input_name form__input"
                                            type="text"
                                            name="name"
                                            id="registration-name"
                                            placeholder="Введите своё имя"
                                            minlength="2"
                                            maxlength="30"
                                            required
                                          />
                                          <span class="popup__error popup__error_invalid-input form__error_name form__error"></span>

                                          <span class="popup__error popup__error_server form__error form__error_server">Такой пользователь уже есть</span>
                                          <button
                                            class="popup__button popup__button_type_reg button form__button"
                                            type="submit"

                                          >
                                          Зарегистрироваться
                                          </button>
                                        </fieldset>
                                      </form>
                                      <p class="popup__text">или
                                        <button
                                          class="popup__subbutton popup__subbutton_form button"
                                          type="button"
                                        >
                                          Войти
                                        </button>
                                      </p>
                                      </div>`;

export default POPUP_REGISTRATION_CONTENT;
