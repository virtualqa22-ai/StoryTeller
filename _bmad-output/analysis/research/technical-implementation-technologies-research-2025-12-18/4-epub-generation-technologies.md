# 4. EPUB Generation Technologies

## 4.1 EPUB3 Landscape (2024)

**Industry State:** ([Kitaboo](https://kitaboo.com/epub-authoring-software-crafting-ebooks-made-easy/), [Quora](https://www.quora.com/Which-software-is-best-open-source-ePUB3-creator-best-ePUB3-reader))

**Top EPUB Authoring Software (2024):**
- KITABOO, Atticus, Vellum, Scrivener, Calibre

**Critical Challenge:**
- "**Sigil and Calibre** are really set up for **ePub2**, and you'll have to do a **fair amount of messing around in the code** to create a fully **ePub3-compliant** ebook" ([Quora](https://www.quora.com/Which-software-is-best-open-source-ePUB3-creator-best-ePUB3-reader))

## 4.2 Open-Source EPUB3 Libraries

**Active GitHub Projects (2024):** ([GitHub Topics](https://github.com/topics/epub3?o=desc&s=updated), [GitHub EPUB Generation](https://github.com/topics/epub-generation))

### **Asciidoctor EPUB3**
- **Language**: Ruby gem
- **Function**: Converts AsciiDoc to EPUB3
- **Status**: "Updated as recently as **September 2025**" (actively maintained)
- **Use case**: If using AsciiDoc markup for authoring

### **EPUBCheck**
- **Function**: "The **conformance checker** for EPUB publications"
- **Status**: "Updated in **February 2024**"
- **Critical**: Validates EPUB3 compliance
- **StoryTeller use**: Essential for export validation

### **Standard Ebooks Toolset**
- **Language**: Python-based
- **Function**: Producing ebook files
- **Status**: "Updated in **February 2024**"
- **Features**: Professional-quality EPUB3 output

## 4.3 Cross-Platform SDKs

**EPUB Reader SDKs:** ([Kitaboo](https://kitaboo.com/choose-sdk-custom-ebook-platform/))

### **ePUBear**
- "**Extremely lightweight** and easily customizable cross-platform ePUB SDK"
- **Compatibility**: "Full compatibility with **ePUB2** and **partial compatibility** with ePUB3"

### **Readium SDK**
- "Written in **cross-platform C++ and JavaScript** code"
- **License**: BSD-type (free for open and closed-source)
- **Industry standard**: Used by many commercial readers

**EPUB Reader for Validation:**
- **Thorium Reader**: "The EPUB reader of choice for **Windows 10 and 11, MacOS and Linux**" ([EDRLab](https://www.edrlab.org/software/thorium-reader/))

## 4.4 EPUB3 Specification

**EPUB3 Standard Requirements:**
- **EPUB3 format**: "Standard format for Kindle" ([LivingWriter](https://livingwriter.com/blog/how-to-publish-a-book-on-amazon-2025-kdp-guide/))
- **Reflowable content**: "Text adapts to different screen sizes and user preferences for font size and spacing" ([HMD Publishing](https://hmdpublishing.com/amazon-kdp-formatting/))
- **Metadata**: Dublin Core metadata required
- **Table of Contents**: NCX file for navigation
- **Package document**: OPF file listing all content
- **Container**: XML file in META-INF directory

## 4.5 EPUB Generation Recommendation

**Recommended Approach: Custom EPUB3 Builder**

**Justification:**
1. **Existing libraries incomplete**: Most focus on EPUB2, EPUB3 "requires messing around in code"
2. **Specification is open**: EPUB3 spec is publicly documented
3. **JavaScript implementation**: Can build in Node.js/TypeScript
4. **Full control**: Ensure perfect Amazon KDP compliance
5. **Validation**: Use EPUBCheck for compliance verification

**Implementation Strategy:**
1. Build custom EPUB3 generator following W3C spec
2. Use JavaScript/TypeScript for maintainability
3. Validate with EPUBCheck before export
4. Test with Thorium Reader for cross-platform verification
5. Optimize for Amazon KDP and Apple Books requirements

**Alternative: Leverage Asciidoctor EPUB3 if using markup approach**
- Requires AsciiDoc as intermediate format
- More dependencies but proven EPUB3 compliance

---
