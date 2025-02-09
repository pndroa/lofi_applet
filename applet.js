const Applet = imports.ui.applet;
const Util = imports.misc.util;
const PopupMenu = imports.ui.popupMenu;
const GLib = imports.gi.GLib; // Für den Home-Ordner Zugriff

class LofiApplet extends Applet.TextIconApplet {
    constructor(metadata, orientation, panelHeight, instanceId) {
        super(orientation, panelHeight, instanceId);

        // Eigenes Icon setzen
        let iconPath = GLib.get_home_dir() + "/.local/share/cinnamon/applets/rofi-beats@lofi/icon.png";
        this.set_applet_icon_path(iconPath);
        this.set_applet_tooltip("Rofi Beats - Lofi Radio");

        // Menü erstellen
        this.menuManager = new PopupMenu.PopupMenuManager(this);
        this.menu = new Applet.AppletPopupMenu(this, orientation);
        this.menuManager.addMenu(this.menu);

        // Senderliste direkt im Menü
        let stations = [
            "Lofi Girl",
            "Chillhop",
            "Box Lofi",
            "The Bootleg Boy",
            "Radio Spinner",
            "SmoothChill"
        ];

        for (let name of stations) {
            let menuItem = new PopupMenu.PopupMenuItem(name);
            menuItem.connect("activate", () => {
                Util.spawnCommandLine(`/opt/lofi start "${name}"`);
            });
            this.menu.addMenuItem(menuItem);
        }

        // Stop-Button
        let stopItem = new PopupMenu.PopupMenuItem("⏹ Stop Radio");
        stopItem.connect("activate", () => {
            Util.spawnCommandLine("/opt/lofi stop");
        });
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        this.menu.addMenuItem(stopItem);

	}

    on_applet_clicked(event) {
        this.menu.toggle();
    }
}

function main(metadata, orientation, panelHeight, instanceId) {
    return new LofiApplet(metadata, orientation, panelHeight, instanceId);
}
