import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Typography from "../components/Typography";
import CrossIcon from './../assets/cross.icon';
import SearchBar from "../components/SearchBar";
import FAQ from "../models/FAQ";
import { useFAQsStore } from "../stores";

const StyledFAQs = styled(Card)`
  padding: 64px 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  .faqs-search {
    margin-bottom: 32px;
  }

  .faqs-wrapper {
    max-width: 768px;
    width: 100%;
  }

  .faq {
    margin-bottom: 15px;
    overflow: hidden;
    

    &.active {
      background: #f5f5f5;
      border-radius: 0 0 10px 10px;

      .faq-question {
        background: var(--primary-color);
        color: white;
        .expand-icon {
          transform: rotate(0deg);
        }
      }

      .faq-answer {
        opacity: 1;
        display: block;
      }
    }
  }
  
  .faq-question {
    border: solid 1px var(--text-secondary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
    transition: background .2s ease;
    border-radius: 10px;
    cursor: pointer;

    .expand-icon {
      transition: transform .5s ease;
      display: inline-flex;
      line-height: 1;
      height: 40px;
      width: 40px;
      justify-content: center;
      align-items: center;
      transform: rotate(45deg);
    }
  }

  .faq-answer {
    padding: 32px;
    opacity: 0;
    display: none;
  }
`

// .filter((faq) => faq.question.includes(searchQuery) || faq.answer.includes(searchQuery))

const FAQs: React.FunctionComponent = () => {
  const [activeFAQ, setActiveFAQ] = useState<FAQ | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const faqs = useFAQsStore((state) => state.FAQs);
  const getFAQs = useFAQsStore((state) => state.getFAQs);

  useEffect(() => {
    getFAQs()
  }, [])
  
  return <StyledFAQs>
    <div className="faqs-wrapper">
      <SearchBar className="faqs-search" placeholder="Search frequently asked questions" onChange={({target}) => setSearchQuery(target.value.toLowerCase())} />
      {faqs.filter((faq) => faq.question.toLowerCase().includes(searchQuery) || faq.answer.toLowerCase().includes(searchQuery)).map((faq) => (
        <div className={`faq ${activeFAQ?.id === faq.id ? "active" : ''}`}>
          <div className="faq-question" onClick={() => {setActiveFAQ(activeFAQ?.id === faq.id ? null : faq)}}>
            <Typography size={20} weight="600">{faq.question}</Typography>
            <Typography size={20} weight="700" className="expand-icon"><CrossIcon /></Typography>
          </div>
          <div className="faq-answer">
            <Typography size={18}>{faq.answer}</Typography>  
          </div>
        </div>
      ))}
    </div>
  </StyledFAQs>;
};

export default FAQs;
