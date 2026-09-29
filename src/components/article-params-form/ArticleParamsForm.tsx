import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
  type OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const asideRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const isInsideAside = asideRef.current?.contains(target);
      const isInsideArrow = arrowRef.current?.contains(target);

      if (!isInsideAside && !isInsideArrow) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleArrowClick = (): void => {
    setIsOpen((prev): boolean => !prev);
  };

  const handleFontFamilyChange = (option: OptionType): void => {
    setFormState(
      (prevState): ArticleStateType => ({
        ...prevState,
        fontFamilyOption: option,
      })
    );
  };

  const handleFontSizeChange = (option: OptionType): void => {
    setFormState(
      (prevState): ArticleStateType => ({
        ...prevState,
        fontSizeOption: option,
      })
    );
  };

  const handleFontColorChange = (option: OptionType): void => {
    setFormState(
      (prevState): ArticleStateType => ({
        ...prevState,
        fontColor: option,
      })
    );
  };

  const handleBackgroundColorChange = (option: OptionType): void => {
    setFormState(
      (prevState): ArticleStateType => ({
        ...prevState,
        backgroundColor: option,
      })
    );
  };

  const handleContentWidthChange = (option: OptionType): void => {
    setFormState(
      (prevState): ArticleStateType => ({
        ...prevState,
        contentWidth: option,
      })
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <div ref={arrowRef}>
        <ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
      </div>

      <aside
        ref={asideRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={handleFontFamilyChange}
          />

          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFontSizeChange}
          />

          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={handleFontColorChange}
          />

          <Separator />

          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={handleBackgroundColorChange}
          />

          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={handleContentWidthChange}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
