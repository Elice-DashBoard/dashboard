import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Weather from "./Weather";
import Book from "./Book";
import Cocktail from "./Cocktail";
import Soccer from "./Soccer";
import Movie from "./Movie";

const initialSections = {
  "section-1": {
    id: "section-1",
    title: "Section 1",
    items: [
      { id: "item-1", content: <Weather /> },
      { id: "item-2", content: <Cocktail /> },
      { id: "item-3", content: <Book /> },
    ],
  },
  "section-2": {
    id: "section-2",
    title: "Section 2",
    items: [
      { id: "item-4", content: <Movie /> },
      { id: "item-5", content: <Soccer /> },
    ],
  },
  // "section-3": {
  //   id: "section-3",
  //   title: "Section 3",
  //   items: [
  //     { id: "item-3", content: <Cocktail /> },
  //     { id: "item-4", content: <Weather /> },
  //   ],
  // },
  // "section-4": {
  //   id: "section-4",
  //   title: "Section 4",
  //   items: [{ id: "item-5", content: <Soccer /> }],
  // },
};

const App = () => {
  const [sections, setSections] = useState(initialSections);
  console.log(sections);

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;

    // 만약 드롭 위치가 없을 경우 (드롭 영역 밖으로 놓을 때)
    if (!destination) return;

    // 같은 섹션 내에서 재정렬하는 경우
    if (source.droppableId === destination.droppableId) {
      const section = sections[source.droppableId];
      const newItems = Array.from(section.items); // 얕은 복사 (원본 배열 변경하지 않음 / 복사본)

      // 소스 인덱스에서 아이템을 제거하고, 해당 위치에 삽입
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);

      // 변경된 섹션을 새로운 상태로 설정
      const newSection = {
        ...section,
        items: newItems,
      };

      console.log(newSection);

      // 변경된 섹션만 업데이트하여 전체 섹션 상태를 업데이트
      setSections({
        ...sections,
        [newSection.id]: newSection,
      });
    } else {
      // 다른 섹션으로 이동하는 경우
      const sourceSection = sections[source.droppableId];
      const destinationSection = sections[destination.droppableId];

      const sourceItems = Array.from(sourceSection.items);
      const [movedItem] = sourceItems.splice(source.index, 1);

      const destinationItems = Array.from(destinationSection.items);
      destinationItems.splice(destination.index, 0, movedItem);

      const newSourceSection = {
        ...sourceSection,
        items: sourceItems,
      };

      const newDestinationSection = {
        ...destinationSection,
        items: destinationItems,
      };

      // 변경된 두 섹션의 상태를 함께 업데이트하여 전체 섹션 상태를 업데이트
      setSections({
        ...sections,
        [newSourceSection.id]: newSourceSection,
        [newDestinationSection.id]: newDestinationSection,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SectionWrapper>
        {Object.values(sections).map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided, snapshot) => (
              <Section
                ref={provided.innerRef}
                {...provided.droppableProps}
                $isDraggingOver={snapshot.isDraggingOver}
              >
                <h2 className="sr-only">{section.title}</h2>
                {section.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ItemWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        $isDragging={snapshot.isDragging}
                      >
                        {item.content}
                      </ItemWrapper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Section>
            )}
          </Droppable>
        ))}
      </SectionWrapper>
    </DragDropContext>
  );
};

export default App;

const SectionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  /* grid-template-rows: repeat(2, 1fr); */
  width: 100%;
  height: 100vh;
`;

const Section = styled.div`
  width: 100%;
  padding: 1rem 1rem;
  /* border: 1px solid #ccc; */
  background-color: ${({ $isDraggingOver }) =>
    $isDraggingOver ? "#f3f3f3" : "white"};
  background-color: #292929;
`;

const ItemWrapper = styled.div`
  min-height: 10rem;
  max-height: 45rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin: 2rem 0;
  background-color: ${({ $isDragging }) => ($isDragging ? "#d3f9d8" : "white")};
  /* box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); */
  overflow-y: auto;
  overflow-x: auto;
`;
