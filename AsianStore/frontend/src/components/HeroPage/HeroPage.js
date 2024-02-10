import React, {Component} from "react";
import styles from "./HeroPage.module.css";


const heroImage = '/static/hero/hero_logo.png';
const im1 = '/static/hero/water_cup.png';
const im2 = '/static/hero/chief.png';
const im3 = '/static/hero/table.png';


class HeroPage extends Component{
    render(){
        return(
            <div className={styles.hero}>
                <section className={styles.logo_image_wrapper}>
                    <h1 className={styles.logo_text}><span>Продаем</span> настоящее <span>азиатское оборудование</span> для ваших настоящих шедевров!</h1>
                    <img src={heroImage} alt=""/>
                </section>

                <section className={styles.about_us}>
                    <h2>О  нас</h2>
                    <div className={styles.tile}>
                        <div className={`${styles.tile_col} ${styles.col1}`}>
                            <img src={im1} alt=""/>
                            <h3>Мы работаем с лучшими азиатскими ресторанами, помогая им достичь выдающихся результатов с помощью нашего оборудования высочайшего качества.</h3>
                            <img src={im3} alt=""/>
                        </div>
                        <div className={styles.tile_col}>
                            <h3>Добро пожаловать в нашу компанию, специализирующуюся на продаже качественного оборудования для паназиатской кухни!</h3>
                            <img src={im2} alt=""/>
                            <h3>Присоединяйтесь к нам и создавайте неповторимые кулинарные шедевры вместе с нами!</h3>
                        </div>
                    </div>
                </section>

                <section className={styles.reasons}>
                    <h2>Почему выбирают нас?</h2>
                    <div className={styles.reasons_items}>
                        <article>
                            <div className={styles.reasons_icon}></div>
                            <p className={styles.reasons_text}>Мы работаем с самыми известными брендами на азиатском рынке, которые зарекомендовали себя</p>
                        </article>
                        <article>
                            <div className={styles.reasons_icon}></div>
                            <p className={styles.reasons_text}>Следим за самыми актуальными ценами на рынке, чтобы вы не упускали выгоды</p>
                        </article>
                        <article>
                            <div className={styles.reasons_icon}></div>
                            <p className={styles.reasons_text}>Доставим оборудование на следующий день!</p>
                        </article>
                        <article>
                            <div className={styles.reasons_icon}></div>
                            <p className={styles.reasons_text}>Упростили систему оформления заказа</p>
                        </article>
                    </div>
                </section>

                <section className={styles.partners}>
                    <h2>Наши партнёры</h2>
                    <div className={styles.partners_items}>
                        <div className={styles.partners_row}>
                            <img src={im1} alt=""/>
                            <img src={im1} alt=""/>
                            <img src={im1} alt=""/>
                            <img src={im1} alt=""/>
                        </div>
                        <div className={styles.partners_row}>
                            <img src={im1} alt=""/>
                            <img src={im1} alt=""/>
                            <img src={im1} alt=""/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default HeroPage;