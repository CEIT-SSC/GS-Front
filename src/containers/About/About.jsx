import React from 'react';
import { Card } from 'react-bootstrap';
import { Container, BSContainer } from './AboutStyle';
import { connect } from 'react-redux';

const About = ({theme}) => {
    return (
        <Container isdark={theme==='DARK'}>
            <BSContainer>
                <Card style={{ width: '100%',
                    filter: `invert(${theme==='DARK' ? 0.9 : 0}) hue-rotate(${theme==='DARK' ? '180deg' : '0deg'})` }}
                >
                    <Card.Body style={{textAlign: 'right', direction: 'rtl'}}>
                        {/* <Card.Title className="text-center" style={{ fontSize: '26px' }}></Card.Title> */}
                        <h6>سلام شرکت کنندگان عزیز،</h6>
                        <p>مسابقه ای که در پیش رو دارید، یک مسابقه سنجش مهارت های عمومی شما در زمینه مهندسی کامپیوتر است و در آن با چالش‌هایی در زمینه‌های متنوعی مثل الگوریتم، وب و لینوکس مواجه خواهید شد.</p>
                        <p>این مسابقه در ۱۰ روز برگزار خواهد شد. هر روز راس ساعت ۱۲ ظهر یک سوال در سایت بارگذاری میشود. در برخی روزها سوالاتی به صورت سورپرایز اضافه بر سوالات اصلی آپلود میشود که زمان بارگذاری آن‌ها مشخص نیست و به شکل ناگهانی می‌باشد. با استفاده از این سوالات میتوانید امتیاز بیشتری بگیرید ولی لازمه آن این است که تا روز آخر مسابقه، چالش را هر روز دنبال کنید تا از بارگذاری این سوالات خبر دار بشید.</p>
                        <p>متن سوالات برای تمامی شرکت کنندگان دقیقا مشابه است و یک داستان کلی را دنبال میکند که توسط تیم داستان نویسی مجرب ما تهیه شده است.</p>
                        <p>در انتهای هر سوال، شما میتوانید با کلیک بر روی دکمه مورد نظر تست کیس سوال را دریافت کنید و در محل بارگذاری جواب، پاسخ کدتان به این تست کیس را در فرمت یک فایل txt بارگذاری کنید. همچنین بارگذاری کد شما جهت بررسی مشابهت های میان کدها و جلوگیری از تقلب اجباری است ولی ارزیابی و نمره دهی تنها بر اساس پاسخ شما به تست کیس صورت میگیرد. توجه کنید که تست کیس های شرکت کنندگان با یکدیگر متفاوت است و هر شرکت کننده تست کیس منحصر بفردی دارد که نیاز است پاسخ آن را بدست آورد.</p>
                        <h6>با آرزوی موفقیت</h6>
                        <h6>تیم برگزاری مسابقه جنرال اسکیلز</h6>
                    </Card.Body>
                </Card>
            </BSContainer>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    error: state.adminAuth.error,
    loading: state.adminAuth.loading,
    isAuthenticated: state.adminAuth.isAuthenticated,
    theme: state.theme
})

export default connect(mapStateToProps)(About);