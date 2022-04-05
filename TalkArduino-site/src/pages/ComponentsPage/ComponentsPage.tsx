import React, { FC, ReactElement, useState } from 'react'

import {
  Button,
  Input,
  Spinner,
  Modal,
  Snack,
  useSnack,
  Loader,
  Statistic,
  LineChart,
  CO2Indicator,
  HorizontalCenterLayer,
  Toggle,
  BarChart,
} from '../../components'

const TestSnack: FC = (): ReactElement => {
  const { addSnack: addNewSnack } = useSnack()

  return (
    <div style={{ display: 'flex', margin: '10px', flexDirection: 'row' }}>
      <Button onClick={() => addNewSnack({ title: 'Hello', content: 'World' })}>Add Snack</Button>
    </div>
  )
}
export const ComponentsPage: FC = (): ReactElement => {
  const [modalPrimary, setModalPrimary] = useState<boolean>(false)
  const [modalSecondary, setModalSecondary] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(true)

  const barData = [
    {
      time: 1,
      BME280: 40,
      'DHT-22': 24
    },
    {
      time: 2,
      BME280: 40,
      'DHT-22': 24
    },
    {
      time: 3,
      BME280: 60,
      'DHT-22': 24
    },
    {
      time: 4,
      BME280: 34,
      'DHT-22': 24
    }
  ]

  const data = [
    {
      id: 'Serie 1',
      data: [
        {
          x: 10.1,
          y: 7.1,
        },
        {
          x: 11,
          y: 4,
        },
        {
          x: 12,
          y: 4,
        },
        {
          x: 13,
          y: 9,
        },
        {
          x: 14,
          y: 7,
        },
      ],
    },
    {
      id: 'Serie 2',
      data: [
        {
          x: 12,
          y: 4,
        },
        {
          x: 13,
          y: 9,
        },
        {
          x: 14,
          y: 7,
        },
        {
          x: 10.1,
          y: 7.1,
        },
        {
          x: 11,
          y: 4,
        },
      ],
    },
  ]

  return (
    <div style={{ display: 'flex', margin: '40px', flexDirection: 'column' }}>
      <h2>Buttons</h2>
      <div style={{ display: 'flex', margin: '10px', flexDirection: 'row' }}>
        <div style={{ margin: '10px' }}>
          <Button>click me</Button>
        </div>
        <div style={{ padding: '10px', backgroundColor: '#115740' }}>
          <Button color="plain">click me</Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button color="light">click me</Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button color="secondary">click me</Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button color="warning">click me</Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button menu>click me</Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button menu color="light">
            click me
          </Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button menu color="secondary">
            click me
          </Button>
        </div>
        <div style={{ margin: '10px' }}>
          <Button menu color="warning">
            click me
          </Button>
        </div>
      </div>
      <h2>Loaders</h2>
      <div style={{ display: 'flex', margin: '10px', flexDirection: 'row' }}>
        <div style={{ margin: '10px' }}>
          <Spinner />
        </div>
        <div style={{ margin: '10px' }}>
          <Spinner type="dark" />
        </div>
        <div style={{ margin: '10px' }}>
          <Loader />
        </div>
        <div style={{ margin: '10px' }}>
          <Loader type="dark" />
        </div>
        <div style={{ margin: '10px' }}>
          <Loader type="plain" />
        </div>
        <div style={{ margin: '10px', background: '#115740' }}>
          <Loader type="white" />
        </div>
      </div>
      <h2>Modals</h2>
      <div style={{ display: 'flex', margin: '10px', flexDirection: 'row' }}>
        <div style={{ margin: '10px' }}>
          <Button onClick={() => setModalPrimary(true)}>Open Modal</Button>
          {modalPrimary && (
            <Modal onClose={() => setModalPrimary(false)} title="Hello">
              <div
                style={{
                  width: '400px',
                  height: '400px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#ccc',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: '50px' }}>Its me Mario!</span>
                <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                  <Button style={{ margin: '0 10px 0 0' }} color="light">
                    Ok
                  </Button>
                  <Button color="warning">Cancel</Button>
                </div>
              </div>
            </Modal>
          )}
        </div>
        <div style={{ margin: '10px' }}>
          <Button onClick={() => setModalSecondary(true)} color="secondary">
            Open Modal
          </Button>
          {modalSecondary && (
            <Modal onClose={() => setModalSecondary(false)} title="Hello" secondary>
              <div
                style={{
                  width: '400px',
                  height: '400px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#ccc',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: '50px' }}>Its me Mario!</span>
                <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                  <Button style={{ margin: '0 10px 0 0' }} color="light">
                    Ok
                  </Button>
                  <Button color="warning">Cancel</Button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
      <h2>Snack</h2>
      <div style={{ display: 'flex', margin: '10px', flexDirection: 'row' }}>
        <div style={{ margin: '10px' }}>
          <Snack title="Hello" content="World" />
        </div>
        <div style={{ margin: '10px' }}>
          <Snack title="Hello" content="World" level="error" />
        </div>
        <div style={{ margin: '10px' }}>
          <Snack title="Hello" content="World" level="info" />
        </div>
      </div>
      <TestSnack />
      <h2>Inputs</h2>
      <div style={{ display: 'flex', margin: '10px', flexDirection: 'row' }}>
        <div style={{ margin: '10px' }}>
          <Input title="title" color="primary" />
        </div>
        <div style={{ margin: '10px' }}>
          <Input title="title" color="primary-light" />
        </div>
        <div style={{ margin: '10px' }}>
          <Input title="title" />
        </div>
        <div style={{ margin: '10px' }}>
          <Input title="title" color="secondary" />
        </div>
        <div style={{ margin: '10px' }}>
          <Input title="title" color="secondary-light" />
        </div>
      </div>
      <h2>Cards</h2>
      <div style={{ display: 'flex', margin: '10px', flexDirection: 'row' }}>
        <div style={{ margin: '10px' }}>
          <Statistic title="Title" description="description" value={'Co2'} color={'good'} />
        </div>
        <div style={{ margin: '10px' }}>
          <Statistic title="Title" description="description" value={'Co2'} color={'warning'} />
        </div>
        <div style={{ margin: '10px' }}>
          <Statistic title="Title" description="description" value={'Co2'} color={'danger'} />
        </div>
        <div style={{ margin: '10px' }}>
          <Statistic title="Title" description="description" value={'Co2'} color={'danger'} loading={true} />
        </div>
      </div>
      <h2>Graphics</h2>
      <HorizontalCenterLayer className="temperature-page__info">
        <LineChart
          data={data}
          wrapperClassName="temperature-page__graphic-wrapper"
          className="temperature-page__graphic"
        />
      </HorizontalCenterLayer>
      <h2>CO2 Indicator</h2>
      <div style={{ display: 'flex', margin: '10px', flexDirection: 'row', height: '400px' }}>
        <CO2Indicator deg={190} />
      </div>
      <h2>Toggle</h2>
      <div style={{ display: 'flex', margin: '10px', flexDirection: 'row' }}>
        <Toggle checked={active} onChange={(e) => {setActive(e.target.value); console.log(e.target.value)}} />
      </div>
      <h2 style={{ margin: '100px 0 0 0' }}>Bar Chart</h2>
      <HorizontalCenterLayer className="temperature-page__info">
        <BarChart
          data={barData}
          wrapperClassName="temperature-page__graphic-wrapper"
          className="temperature-page__graphic"
        />
      </HorizontalCenterLayer>
      <h2>Data Wrapper</h2>
    </div>
    
  )
}
