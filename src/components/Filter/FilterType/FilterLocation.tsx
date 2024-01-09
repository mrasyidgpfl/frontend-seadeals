import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';
import { ReactComponent as IconChevronRight } from '../../../assets/svg/icon_chevron_right.svg';
import ModalFilterLocation from '../../Modal/ModalFilterLocation/ModalFilterLocation';

type FilterLocationProps = {
  filterClass: string;
  data: any[];
  handleInput: (cityName: string) => void;
  handleDelete: () => void;
};

const FilterLocation = (props: FilterLocationProps) => {
  const {
    filterClass,
    data,
    handleInput,
    handleDelete,
  } = props;

  const [isModalFilterLocationOpen, setIsModalFilterLocationOpen] = useState(false);
  const [citiesByLetter, setCitiesByLetter] = useState<any>([]);

  const groupingCities = () => {
    let grouping: any[] = [];
    for (let i = 0; i < data.length; i += 1) {
      const isLetterExist = grouping.findIndex((el) => el.letter === data[i].city_name.charAt(0));
      if (isLetterExist >= 0) {
        grouping[isLetterExist].items = [
          ...grouping[isLetterExist].items,
          data[i],
        ];
      }
      if (isLetterExist < 0) {
        const newGrouping = {
          letter: data[i].city_name.charAt(0),
          items: [data[i]],
        };
        grouping = [...grouping, newGrouping];
      }
    }
    setCitiesByLetter(grouping);
  };

  const dataSlice = data.slice(0, 8);

  const openModalLocationFilter = () => {
    setIsModalFilterLocationOpen(true);
  };

  const closeModalLocationFilter = () => {
    setTimeout(() => {
      setIsModalFilterLocationOpen(false);
    }, 500);
  };

  useEffect(() => {
    groupingCities();
  }, [data]);

  return (
    <div className="filter_location_container">
      <div className="filter_location_content">
        <h3 className="title">Lokasi</h3>
        <div className={`items_content ${filterClass}`}>
          {
            dataSlice.map(
              (item: any) => (
                <div
                  key={`${item.city_id}-${item.city_name}`}
                  className="location_item"
                >
                  <div
                    className={`checkbox filter ${item.isChecked ? 'checked' : ''}`}
                    onClick={() => handleInput(item.city_name)}
                    role="presentation"
                  >
                    {
                      React.createElement(IconCheck, { className: 'icon_checked' })
                    }
                  </div>
                  <p
                    className="name"
                    onClick={() => handleInput(item.city_name)}
                    role="presentation"
                  >
                    { item.city_name }
                  </p>
                </div>
              ),
            )
          }
        </div>
        <Button
          buttonType="plain right"
          text="Lihat Semua"
          iconUrl={IconChevronRight}
          iconName="all"
          handleClickedButton={openModalLocationFilter}
        />
        <Button
          buttonType="secondary"
          text="Hapus"
          handleClickedButton={handleDelete}
        />
      </div>
      {
        isModalFilterLocationOpen
        && (
          <ModalFilterLocation
            isOpen={isModalFilterLocationOpen}
            data={citiesByLetter}
            handleInput={handleInput}
            handleDelete={handleDelete}
            handleCloseModal={closeModalLocationFilter}
          />
        )
      }
    </div>
  );
};

export default FilterLocation;
