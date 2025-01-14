import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";
import React, { useState } from "react";
import smart from "./assets/smart.png";
import drums from "./assets/drums.png";
import smileArrow from "./assets/smile-arrow.png";
import gift from "./assets/gift.png";
import cashback from "./assets/cashback.png";
import percent from "./assets/percent.png";
import free from "./assets/free.png";
import transfer from "./assets/transfer.png";
import cash from "./assets/cash.png";
import discount from "./assets/discount.png";
import heart from "./assets/heart.png";
import deposit from "./assets/deposit.png";
import bonus from "./assets/bonus.png";
import lock from "./assets/lock.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { Gap } from "@alfalab/core-components/gap";
import { Notification } from "@alfalab/core-components/notification";
import { sendDataToGA } from "./utils/events.ts";

interface Product {
  title: string;
  text?: string;
  image: string;
  name: string;
  type: Type;
  lite?: string;
  standard?: string;
  premium?: string;
}

type Type = "lite" | "standard" | "premium";

interface Categories {
  title: string;
  products: Array<Product>;
}

const categories: Array<Categories> = [
  {
    title: "Входит в подписку",
    products: [
      {
        text: "Какой-то текст",
        title: "Бесплатные переводы",
        image: transfer,
        name: "free_transfer",
        type: "lite",
      },
      {
        text: "Какой-то текст",
        title: "Бесплатные уведомления",
        lite: "дебетовые карты",
        standard: "дебетовые карты",
        premium: "все карты",
        image: free,
        name: "free_pushes",
        type: "lite",
      },
      {
        text: "Какой-то текст",
        title: "Секретная подборка партнёров с кэшбэком",
        image: gift,
        name: "secret_cashback",
        type: "lite",
      },
      {
        text: "Какой-то текст",
        title: "+1 топовая категория кэшбэка",
        standard: "5%",
        premium: "7%",
        image: smileArrow,
        name: "one_cashback",
        type: "standard",
      },
      {
        title: "+1 попытка крутить барабан суперкэшбэка",
        text: "Какой-то текст",
        image: drums,
        name: "one_baraban",
        type: "standard",
      },
      {
        title: "Увеличенный лимит кэшбэка",
        standard: "7 000 ₽/мес.",
        premium: "10 000 ₽/мес.",
        image: cashback,
        name: "limit_cashback",
        type: "standard",
        text: "Какой-то текст",
      },
      {
        title: "+3% годовых по накопительному счёту",
        text: "Какой-то текст",
        image: percent,
        name: "percent",
        type: "standard",
      },
      {
        title: "Бесплатное снятие наличных",
        standard: "до 200 000 ₽",
        premium: "до 200 000 ₽",
        image: cash,
        name: "free_cash",
        type: "standard",
        text: "Какой-то текст",
      },
      {
        title: "Скидка 20% на комиссию на бирже",
        image: discount,
        name: "discount",
        type: "standard",
        text: "Какой-то текст",
      },
      {
        title: "Приоритетное обслуживание",
        image: heart,
        name: "heart",
        type: "premium",
        text: "Какой-то текст",
      },
      {
        title: "+1% годовых по накопительному вкладу",
        image: deposit,
        name: "deposit",
        type: "premium",
        text: "Какой-то текст",
      },
    ],
  },
  {
    title: "Семейный доступ",
    products: [
      {
        title: "Все преимущества доступны близким",
        image: bonus,
        name: "bonus",
        type: "premium",
        premium: "до 3 человек",
        text: "Какой-то текст",
      },
    ],
  },
];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [type, setType] = useState<Type>("standard");
  const [planName, setPlanName] = useState<string>("Старт 199 ₽/мес.");
  const [isVisible, setIsVisible] = React.useState(false);

  const hideNotification = React.useCallback(() => setIsVisible(false), []);

  const submit = () => {
    setLoading(true);
    sendDataToGA({ plan_name: planName }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  const setVisibility = (plan: Type, type: Type) => {
    if (plan === "lite" && type === "lite") {
      return true;
    } else if (
      plan === "standard" &&
      (type === "lite" || type === "standard")
    ) {
      return true;
    } else if (
      plan === "premium" &&
      (type === "lite" || type === "standard" || type === "premium")
    ) {
      return true;
    }
    return false;
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <img src={smart} alt="Картинка Альфа-Смарт" />
          <Typography.TitleResponsive
            tag="h1"
            view="medium"
            font="system"
            weight="bold"
          >
            Альфа-Смарт
          </Typography.TitleResponsive>
        </div>

        <Typography.Text
          view="primary-medium"
          color="primary"
          style={{ textAlign: "center" }}
        >
          Выберите план
        </Typography.Text>
        <div className={appSt.plans}>
          <ButtonMobile
            block
            view={type === "lite" ? "primary" : "secondary"}
            onClick={() => {
              setType("lite");
              setPlanName("Старт 199 ₽/мес.");
            }}
            size="xs"
            style={{ padding: "0.5rem", width: "fit-content" }}
          >
            <span style={{ marginBottom: "1rem", display: "block" }}>
              Старт
            </span>
            <b>199 ₽/мес.</b>
          </ButtonMobile>
          <ButtonMobile
            block
            view={type === "standard" ? "primary" : "secondary"}
            onClick={() => {
              setType("standard");
              setPlanName("Стандарт 399 ₽/мес.");
            }}
            size="xs"
            style={{
              padding: "0.5rem",
              opacity: "1",
              width: "fit-content",
            }}
          >
            <span style={{ marginBottom: "1rem", display: "block" }}>
              Стандарт
            </span>
            <b>399 ₽/мес.</b>
          </ButtonMobile>
          <ButtonMobile
            block
            view={type === "premium" ? "primary" : "secondary"}
            onClick={() => {
              setType("premium");
              setPlanName("Плюс 999 ₽/мес.");
            }}
            size="xs"
            style={{
              padding: "0.5rem",
              opacity: "1",
              width: "fit-content",
            }}
          >
            <span style={{ marginBottom: "1rem", display: "block" }}>Плюс</span>
            <b>999 ₽/мес.</b>
          </ButtonMobile>
        </div>

        <div className={appSt.products}>
          {categories.map((category) => (
            <React.Fragment key={category.title}>
              <Typography.TitleResponsive
                font="system"
                tag="h2"
                weight="bold"
                view="small"
                className={appSt.productsTitle}
              >
                {category.title}
              </Typography.TitleResponsive>
              {category.products.map((product) => (
                <React.Fragment key={product.title}>
                  <div
                    key={product.title}
                    style={{ position: "relative" }}
                    onClick={() => {
                      if (!setVisibility(type, product.type)) {
                        setIsVisible(true);
                      }
                    }}
                  >
                    {!setVisibility(type, product.type) && (
                      <div className={appSt.productLockContainer}>
                        <img src={lock} alt="" width={35} height={35} />
                      </div>
                    )}
                    <div
                      className={appSt.product}
                      style={{
                        ...(!setVisibility(type, product.type) && {
                          opacity: "0.5",
                        }),
                      }}
                    >
                      <div>
                        {type === "lite" && (
                          <Typography.TitleResponsive
                            font="system"
                            view="small"
                            weight="bold"
                            tag="h3"
                            className={appSt.productTitle}
                          >
                            {product.title}
                          </Typography.TitleResponsive>
                        )}
                        {type === "standard" && (
                          <Typography.TitleResponsive
                            font="system"
                            view="small"
                            weight="bold"
                            tag="h3"
                            className={appSt.productTitle}
                          >
                            {product.title}
                          </Typography.TitleResponsive>
                        )}
                        {type === "premium" &&
                          product.title !==
                            "+1% годовых по накопительному счёту" && (
                            <Typography.TitleResponsive
                              font="system"
                              view="small"
                              weight="bold"
                              tag="h3"
                              className={appSt.productTitle}
                            >
                              {product.title}
                            </Typography.TitleResponsive>
                          )}
                        {type === "premium" &&
                          product.title ===
                            "+1% годовых по накопительному счёту" && (
                            <Typography.TitleResponsive
                              font="system"
                              view="small"
                              weight="bold"
                              tag="h3"
                              className={appSt.productTitle}
                            >
                              <Typography.Text
                                view="primary-small"
                                color="secondary"
                                tag="p"
                                className={appSt.productText}
                                style={{
                                  textDecoration: "line-through",
                                  display: "inline",
                                }}
                              >
                                1%
                              </Typography.Text>{" "}
                              +2% годовых по накопительному счёту
                            </Typography.TitleResponsive>
                          )}

                        {product[type] && type === "lite" && (
                          <Typography.Text
                            view="primary-medium"
                            tag="p"
                            className={appSt.productText}
                          >
                            {product.lite}
                          </Typography.Text>
                        )}

                        {product[type] && type === "standard" && (
                          <Typography.Text
                            view="primary-medium"
                            tag="p"
                            className={appSt.productText}
                          >
                            {product.standard}
                          </Typography.Text>
                        )}

                        {product[type] &&
                          type === "premium" &&
                          product.standard && (
                            <div style={{ display: "flex" }}>
                              {product.title !==
                                "Бесплатное снятие наличных" && (
                                <Typography.Text
                                  view="secondary-large"
                                  tag="p"
                                  color="secondary"
                                  className={appSt.productText}
                                  style={{
                                    textDecoration: "line-through",
                                    marginRight: "0.5rem",
                                  }}
                                >
                                  {product.standard}
                                </Typography.Text>
                              )}
                              <Typography.Text
                                view="primary-medium"
                                tag="p"
                                className={appSt.productText}
                              >
                                {product.premium}
                              </Typography.Text>
                            </div>
                          )}

                        {product[type] &&
                          type === "premium" &&
                          !product.standard && (
                            <Typography.Text
                              view="primary-medium"
                              tag="p"
                              className={appSt.productText}
                            >
                              {product.premium}
                            </Typography.Text>
                          )}
                      </div>
                      <img
                        src={product.image}
                        alt=""
                        width={50}
                        height={50}
                        className={appSt.productIcon}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>

        <Notification
          badge="negative"
          title="Недоступно в этом плане"
          visible={isVisible}
          offset={16}
          onClose={hideNotification}
          onCloseTimeout={hideNotification}
        />
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} block view="primary" onClick={submit}>
          Подключить
        </ButtonMobile>
      </div>
    </>
  );
};
