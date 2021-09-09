import { ResetStyle, GlobalStyle } from '../../globalStyle'
import './about.css'

export default function AboutPage() {
  return (
    <div>
      <ResetStyle />
      <GlobalStyle />
      <div className="about-container">
        <div className="about-profile">
          <div className="about-profile__info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ipsum
            velit, pharetra sit amet hendrerit quis, ultricies non purus. Ut
            consequat varius eros, sit amet posuere erat sodales eu. Phasellus
            leo nisl, consectetur vel efficitur a, convallis sed lectus. Nunc
            rutrum, est nec malesuada dictum, tellus lorem tincidunt ligula, at
            consectetur felis purus non eros. Vivamus tempor nisi lacus, sed
            commodo tellus ultricies vel. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Proin
            sollicitudin, metus in tempus condimentum, lorem sapien interdum
            dolor, ut posuere dolor lectus at diam. Suspendisse fermentum turpis
            quis aliquam dignissim. Morbi eu hendrerit erat, vitae imperdiet
            nisl. Praesent a aliquet urna, a ultrices sem. Sed in consectetur
            augue.
          </div>
          <div className="about-profile__pic"></div>
        </div>
      </div>
    </div>
  )
}
