/**
 * Library for creating dynamic UI extensions for Cisco Webex Devices in a declarative fashion.
 *
 * This means the developer does need to know or use the xml syntax required by the xAPI commands
 * for adding / changing UI extensions.
 *
 * Example usage:
 * ```
 * const { Config, Panel } = require('uiext');
 * const config = Config({ version: '1.8' }, Panel());
 * ```
 * @module
 */

/**
 * General node for any UI element
 */
declare interface Node {
  type: string;
  attributes?: Object[];
  children?: Node[];
}

declare interface Widget extends Node {
  Type: string;
  WidgetId: string;
}

/**
 * Converts any node (and all children) to the XML format that the xAPI commands expect
 * Typically you always want to do this on the config object only.
 */
declare function toXml(node: Node): string;

/** Creates a new UI extension config */
declare function Config(attributes: ConfigAttributes, panels?: Node | Node[]): Node;

declare function Panel(attributes: PanelAttributes, pages?: Node | Node[]): Node;

declare function ActionButton(attributes: PanelAttributes): Node;

declare function WebApp(attributes: WebAppAttributes): Node;

declare function Page(attributes: PageAttributes, rows: Node | Node[]): Node;

declare function Row(attributes: RowAttributes, widgets: Widget | Widget[]): Node;


declare interface ConfigAttributes {
  version?: string;
}

declare interface PanelAttributes {
  panelId?: string;
  type?: 'Home' | 'InCall' | 'StatusBar' | 'Never';
  color?: string;
  icon?: PanelIcon;
  order?: number;
  name?: string;
}

declare interface WebAppAttributes {
  url: string;
  panelId?: string;
  type?: 'Home' | 'InCall' | 'StatusBar' | 'Never';
  color?: string;
  icon?: string;
  order?: number;
  name?: string;
}

// list = Array.from(document.querySelectorAll('.icon-button'))
// list.map(b => b.classList[1].replace('icon-', '')).sort((i1, i2) => i1 < i2 ? -1 : 1).join('|')
declare type PanelIcon = 'Blinds|Briefing|Camera|Concierge|Disc|Handset|Help|Helpdesk|Home|Hvac|Info|Input|Language|Laptop|Lightbulb|Media|Microphone|Power|Proximity|Record|Sliders|Tv';

declare type ButtonIcon = 'arrow_down|arrow_left|arrow_right|arrow_up|audio_minus|audio_plus|back|blue|eject|end|fast_bw|fast_fw|green|help|home|list|mic|mic_muted|minus|pause|phone|play|play_pause|plus|plus|power|record|red|skip_bw|skip_fw|speaker|speaker_muted|stop|video|video_muted|volume_muted|yellow|zoom_in|zoom_out';

/**
 * Pages can be inside panels.
 * @param hideRowNames Hide the name rows on the left if you want to make the page more compact
 */
declare interface PageAttributes {
  pageId?: string;
  name?: string;
  hideRowNames?: boolean;
}

declare interface RowAttributes {
  text?: string;
}

declare type WidgetSize = 1 | 2 | 3 | 4;

declare function Button(attributes: {
  widgetId: string;
  text?: string;
  size?: WidgetSize;
  icon?: ButtonIcon;
}): Widget;

declare function GroupButton(attributes: {
  widgetId: string;
  buttons: object;
}): Widget;

declare function Spinner(attributes: {
  widgetId: string;
  size?: WidgetSize;
  style?: 'vertical' | 'horizontal' | 'plusminus';
}): Widget;

declare function Slider(attributes: {
  widgetId: string;
  size?: WidgetSize;
}): Widget;

declare function Spacer(attributes: {
  widgetId: string;
  size?: WidgetSize;
}): Widget;

declare function DirectionalPad(attributes: {
  widgetId: string;
  text?: string;
}): Widget;

declare function Text(attributes: {
  widgetId: string;
  text?: string;
  size?: WidgetSize;
  fontSize?: 'small' | 'normal';
  align?: '' | '' | '';
}): Widget;

declare function ToggleButton(attributes: {
  widgetId: string;
}): Widget;
