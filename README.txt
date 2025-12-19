/* TNES | Türkiye Nükleer Etki Simülasyonu */

TNES, olası bir nükleer patlamanın Türkiye coğrafyası üzerindeki etkilerini bilimsel veriler ve modern görselleştirme teknikleriyle analiz etmek için tasarlanmış bir stratejik simülasyon aracıdır. 

* Özellikler :

  -> Gelişmiş Harita Motoru

  -> Dinamik Etki Analizi

  -> Rüzgar ve Serpinti

  -> Gerçek Zamanlı İstatistikler

  -> DEFCON Durum Göstergesi

  -> Modern Arayüz (HUD)

* Kullanılan Teknolojiler :

 -> HTML / Tailwind CSS
 -> JavaScript

* Geliştirici : Eren Söğütlü

* Simülasyonda kullanılan yarıçap hesaplamaları, nükleer fizik literatüründeki temel ölçeklendirme yasalarına (Scaling Laws) dayanmaktadır :

 -> Ateş Topu (Fireball): $R_{ates} \approx 0.15 \times kt^{0.4}$

 -> Basınç Şoku (Air Blast - 20 psi): $R_{basinc} \approx 0.65 \times kt^{0.33}$

 -> Termal Radyasyon (Thermal Radiation): $R_{termal} \approx 1.8 \times kt^{0.45}$

 -> Radyoaktif Serpinti (Fallout): Rüzgar vektörü ve logaritmik dağılım fonksiyonları ile simüle edilmektedir.

⚠️ Yasal Uyarı

TNES (Türkiye Nükleer Etki Simülasyonu) tamamen eğitim, farkındalık ve görselleştirme amaçlıdır. Uygulamada sunulan veriler tahminidir ve gerçek bir senaryoda coğrafi engeller, atmosferik basınç ve yerel hava durumu gibi birçok değişken sonucu değiştirebilir. Bu sistem askeri veya resmi bir savunma aracı değildir.

LİNK : https://erensogutlu-tnes.netlify.app/

------------------------------------------------------------------------------------------------------------------

/* TNES | Türkiye Nuclear Impact Simulation */

TNES is a strategic simulation tool designed to analyze the effects of a possible nuclear explosion on Türkiye's geography with scientific data and modern visualization techniques.

* Features: 

 -> Advanced Map Engine 

 -> Dynamic Impact Analysis 

 -> Wind and Spray 

 -> Real Time Statistics 

 -> DEFCON Status Indicator 

 -> Modern Interface (HUD)

* Technologies Used:

 -> HTML / Tailwind CSS
 ->JavaScript

* Developer: Eren Söğütlü

* Radius calculations used in the simulation are based on the basic scaling laws in the nuclear physics literature:

 -> Fireball: $R_{ates} \approx 0.15 \times kt^{0.4}$

 -> Pressure Shock (Air Blast - 20 psi): $R_{pressinc} \approx 0.65 \times kt^{0.33}$

 -> Thermal Radiation: $R_{thermal} \approx 1.8 \times kt^{0.45}$

 -> Radioactive Fallout (Fallout): It is simulated with wind vector and logarithmic distribution functions.

⚠️ Legal Notice

TNES (Türkiye Nuclear Impact Simulation) is entirely for education, awareness and visualization purposes. The data presented in the application is an estimate and in a real scenario, many variables such as geographical obstacles, atmospheric pressure and local weather can change the result. This system is not a military or official defense tool.

LINK: https://erensogutlu-tnes.netlify.app/
