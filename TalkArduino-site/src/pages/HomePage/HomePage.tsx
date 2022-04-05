import React, { FC, ReactElement } from 'react'

import { CenterLayer, HorizontalCenterLayer } from '../../components'
import { useAuthContext } from '../../contexts'
import { Permissions } from '../../routes/routes'
import { LoginForm } from '../LoginPage'

import './styles.scss'

export const HomePage: FC = (): ReactElement => {
  const { permissions, ready } = useAuthContext()
  return (
    <div className="home">
      <CenterLayer className="home__wrapper">
        <HorizontalCenterLayer className="home__info">
          <h2 className="home__title">About US:</h2>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis magna metus, eu feugiat neque
              sollicitudin eu. Sed lorem ipsum, tincidunt a tellus sed, condimentum mattis odio. Vestibulum lobortis
              nulla ut vulputate vestibulum. Etiam pharetra, lectus et dictum dictum, mauris orci venenatis erat, et
              tempor erat orci et lacus. Donec venenatis mi nisi. Vestibulum ante ipsum primis in faucibus orci luctus
              et ultrices posuere cubilia curae; Nulla et risus ultrices, ultricies lacus in, ultrices nibh. Duis quam
              mi, euismod sed finibus sit amet, venenatis eget urna. Phasellus purus metus, vestibulum eu varius a,
              pretium eget nibh.
            </p>
            <p>
              Nulla sit amet vehicula mauris, eu pharetra nisl. Aliquam erat volutpat. Donec in commodo mi. Nam
              pellentesque semper tristique. Fusce sollicitudin purus ac diam lobortis euismod. Nam nulla est, tincidunt
              ut fringilla sed, bibendum iaculis nisl. Phasellus dignissim pulvinar nisi, vel maximus risus gravida vel.
            </p>
            <p>
              Maecenas eleifend turpis eu lectus tincidunt, at pulvinar orci dignissim. Quisque ut ligula pulvinar,
              feugiat turpis sit amet, blandit leo. Morbi egestas quam at libero interdum dignissim sit amet id turpis.
              Praesent aliquam justo eget nunc commodo porttitor. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Nunc ullamcorper nulla tincidunt sem semper, hendrerit
              facilisis urna pharetra. Nullam sodales at ante vehicula sollicitudin. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas. Praesent ut tortor eu nisl congue
              posuere. Phasellus elementum, risus eu rhoncus tincidunt, leo nulla ultrices lectus, sed tincidunt dolor
              mi non risus. Suspendisse vel malesuada mauris, vel porta orci. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <p>
              Morbi porttitor risus ac diam eleifend gravida. Curabitur varius turpis mi, vel maximus ex condimentum
              quis. Donec vel lacus dui. Nullam pretium condimentum risus, sit amet imperdiet odio faucibus sit amet.
              Duis quis sem in nisi tincidunt ornare sit amet eget neque. Praesent in magna justo. Sed tempus varius
              consequat. Proin eu convallis nunc. Phasellus neque arcu, scelerisque ut efficitur sed, porta ut quam.
              Donec ac suscipit neque, eget rutrum nunc. Morbi blandit at nibh ut maximus.
            </p>
            <p>
              Vivamus blandit ipsum at justo sodales, auctor pretium lorem venenatis. Proin non ipsum suscipit, rutrum
              ex eu, feugiat nulla. Sed nec cursus urna. Vivamus dignissim urna nec neque pharetra, sit amet ultricies
              justo pellentesque. Fusce lobortis risus sit amet facilisis commodo. Nunc porta varius tellus, id pretium
              augue lacinia non. Etiam tempor suscipit libero in imperdiet. Suspendisse consequat tincidunt dapibus.
              Nulla eleifend felis vel orci dapibus, eu hendrerit risus dapibus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Nullam convallis suscipit enim sed congue.
            </p>
          </div>
        </HorizontalCenterLayer>
        {!permissions.includes(Permissions.AUTH) && ready && <LoginForm />}
      </CenterLayer>
    </div>
  )
}
