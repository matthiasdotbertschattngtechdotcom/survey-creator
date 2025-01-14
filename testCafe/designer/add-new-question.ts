import { Selector } from "testcafe";
import { addQuestionByAddQuestionButton, getToolboxItemByText, getVisibleElement, setJSON, url } from "../helper";

const title = "Add new question";

fixture`${title}`.page`${url}`.beforeEach(
  async (t) => {
    await t.maximizeWindow();
  }
);

test("Add New Question", async t => {
  await t
    .maximizeWindow()
    .expect(Selector(".svc-page__add-new-question > span").withText("Add Question").visible).ok()
    .click(Selector(".svc-page__add-new-question > span").withText("Add Question"))
    .expect(Selector("span").withText("question1").visible).ok()
    .expect(Selector('[class^="svc-question__content svc-question__content--selec"]').visible).ok()
    .click(Selector(".svc-page__add-new-question > button.svc-page__question-type-selector"))
    .wait(100)
    .pressKey("p")
    .click(Selector(".sv-popup:not(.sv-popup--overlay) li").withExactText("Panel").filterVisible())
    .click(Selector(".svc-panel__add-new-question > span").withText("Add Question"))
    .expect(Selector("span").withText("question1").visible).ok();
});

test("No Add New Question in HTML question placeholder", async t => {
  await t
    .maximizeWindow()
    .expect(getVisibleElement(".svc-question__content").exists).notOk()
    .hover(getToolboxItemByText("Html"), { speed: 0.5 })
    .click(getToolboxItemByText("Html"), { speed: 0.5 })
    .expect(getVisibleElement(".svc-question__content.svc-question__content--selected").exists).ok()

    .expect(Selector(".sd-question--html+.svc-panel__placeholder_frame .svc-panel__add-new-question > span").withText("Add Question").exists).notOk();
});